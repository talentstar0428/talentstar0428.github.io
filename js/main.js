
Cesium.BingMapsApi.defaultKey       = 'AsarFiDvISunWhi137V7l5Bu80baB73npU98oTyjqKOb7NbrkiuBPZfDxgXTrGtQ';

var viewer                          = new Cesium.Viewer('cesiumContainer', {
                                        homeButton : false,
                                        creditContainer : null,
                                        navigationHelpButton : false,
                                        navigationInstructionsInitiallyVisible: false,
                                        timeline : false,
                                        clock : null,
                                        automaticallyTrackDataSourceClocks:false,
                                        selectionIndicator:false,
                                        fullscreenElement: 'previewContent',
                                        baseLayerPicker: false,
                                        imageryProvider : new Cesium.createOpenStreetMapImageryProvider({
                                            url : 'https://stamen-tiles.a.ssl.fastly.net/watercolor/',
                                            fileExtension: 'png'
                                        }),
                                        infoBox : false,
                                        sceneModePicker : false,
                                    });

var mousedown                       = false;

var isNewYork                       = false;

var isBaverlyHill                   = false;

var isHome                          = false;

var newyork                         = new NewYorkCity();

var baverlyHill                     = new BaverlyHill();

var street                          = null;

var man                             = null;

var current_pos                     = null;

var xDown                           = null;                                                        
var yDown                           = null;

var cesiumContainer                 = document.getElementById("cesiumContainer");

var doubleTapEntity                 = null;

function handleOrientation(event) 
{

    var z           = event.alpha;
    var x           = event.beta;
    var y           = event.gamma;

    if (this.mousedown == false) 
    {

        viewer.camera.rotateLeft(y / 1000);
    }

}

function gotoNewYork() 
{
    if (isNewYork == false) {
        street.moveSelectBuildingOrigin();
        newyork.flyTo();
    }
}

function gotoBeverlyHill() 
{
    if (isBaverlyHill == false) {
        street.moveSelectBuildingOrigin();
        baverlyHill.flyTo();
    }
}

function gotoHome() 
{
    if (isHome == false) {
        viewer.trackedEntity = man;
        street.moveSelectBuildingOrigin();
        viewer.scene.camera.flyToBoundingSphere(
            new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(current_pos.coords.longitude, current_pos.coords.latitude, 400.0), 300),
            {
                maximumHeight: 10000000,
                complete: function () {
                    newyork.center_Entity.show = false;
                    baverlyHill.center_Entity.show = false;
                    isHome = true;
                    isBaverlyHill = false;
                    isNewYork = false;
                },
                orientation : {
                    heading: Cesium.Math.toRadians(-60),
                    pitch: Cesium.Math.toRadians(-25.0),
                    roll: 0.0
                }
            });
    }
}

window.onmousedown                      = onMouseDown;

window.onmouseup                        = onMouseUp;

var modelingObjects                     = [];

var uri_obj                             = [
                                            './3dobject/house1/exterior-p0b.gltf',
                                            './3dobject/house2/exterior-p0a.gltf',
                                            './3dobject/house3/exterior-p0c.gltf'
                                        ];

var modelingObjectCount                 = 3;

function loadingObject() 
{
    for (var i = 0; i < modelingObjectCount; i ++) 
    {
        var entity = new Cesium.Entity({
            model: {
                uri: uri_obj[i],
                shadows : Cesium.ShadowMode.DISABLED
            },
        });
        modelingObjects.push(entity);
    }
}

function onMouseDown(event) 
{
    this.mousedown = true;
}

function onMouseUp(event) 
{
    this.mousedown = false;
}

function fly(position) 
{

    viewer.shadowMap.lightCamera        = viewer.camera;

    var source                          = new Cesium.CustomDataSource();
    current_pos                         = position;

    viewer.dataSources.add(source);

    man = new Cesium.Entity(
    {
        position : Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude),
        id: 'man',
        ellipse : {
            semiMajorAxis : 500.0,
            semiMinorAxis : 500.0,
            material : Cesium.Color.TRANSPARENT,
        },
    });

    doubleTapEntity = new Cesium.Entity(
    {
        position : Cesium.Cartesian3.fromDegrees(0, 0),
        ellipse : {
            semiMajorAxis : 10.0,
            semiMinorAxis : 10.0,
            material : Cesium.Color.TRANSPARENT,
        },
    });

    source.entities.add(man);
    source.entities.add(doubleTapEntity);

    viewer.trackedEntity = man;

    street = new StreetView();
    street.init(viewer, source);
    street.setLatLon(position.coords.longitude, position.coords.latitude);
    street.dispObject();
    street.enableSpaceEventHandler(viewer);
    street.enableCameraMoveEventHandler(viewer);

    newyork.init(source, {x: -73.985130, y: 40.758896});
    newyork.drawPos();

    baverlyHill.init(source, {x: -118.402545, y: 34.0736204});
    baverlyHill.drawPos();

    newyork.center_Entity.show = false;
    baverlyHill.center_Entity.show = false;

    // street.initEvent();

    this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    this.viewer.screenSpaceEventHandler.destroy();

    function initEventOrientation() 
    {
        // window.addEventListener("deviceorientation", handleOrientation);
        isHome = true;
        var controller = viewer.scene.screenSpaceCameraController;
        controller.enableRotate = false;

        var touch = new Touch();
        touch.init(cesiumContainer, horizontalFunc, verticalFunc);

        Hammer(cesiumContainer).on("doubletap", onDoubleTap);
    }

    function horizontalFunc(diff) 
    {
        if (diff > 0) 
            onLeftSwipe(diff);
        else 
            onRightSwipe(diff);
    }

    function verticalFunc(diff) 
    {
        if (diff > 0) 
            onDownMove(diff);
        else 
            onUpMove(diff);
    }

    function onLeftSwipe(diff) 
    {
        viewer.camera.rotateLeft(Cesium.Math.toDegrees(0.001));
    }

    function onRightSwipe(diff) 
    {
        viewer.camera.rotateRight(Cesium.Math.toDegrees(0.001));
    }

    function onUpMove(diff) 
    {
        if (viewer.camera.position.z > 10)
            viewer.camera.move(new Cesium.Cartesian3(viewer.camera.direction.x, viewer.camera.direction.y, 0), viewer.camera.position.z / 7);
        else viewer.camera.move(new Cesium.Cartesian3(viewer.camera.direction.x, viewer.camera.direction.y, 0), 4);
    }

    function onDownMove(diff) 
    {
        if (viewer.camera.position.z > 10)
            viewer.camera.move(new Cesium.Cartesian3(viewer.camera.direction.x, viewer.camera.direction.y, 0), -viewer.camera.position.z / 7);
        else viewer.camera.move(new Cesium.Cartesian3(viewer.camera.direction.x, viewer.camera.direction.y, 0), -4);
    }

    function onDoubleTap(event) 
    {
        street.moveSelectBuildingOrigin();
        var position = viewer.camera.pickEllipsoid({x:event.pointers[0].clientX, y:event.pointers[0].clientY});
        var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
        doubleTapEntity.position = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographicPosition.longitude), 
            Cesium.Math.toDegrees(cartographicPosition.latitude));
        viewer.trackedEntity = doubleTapEntity;

        viewer.scene.camera.flyToBoundingSphere(
            new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographicPosition.longitude)
                , Cesium.Math.toDegrees(cartographicPosition.latitude), 100.0), 50),
            {
                complete: function () {
                    isHome = false;
                    isBaverlyHill = false;
                    isNewYork = false;
                    street.selectBuilding = -1;
                },
            });
    }

    viewer.scene.camera.flyToBoundingSphere(
            new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 400.0), 300),
            {
                complete: initEventOrientation,
                orientation : {
                    heading: Cesium.Math.toRadians(-60),
                    pitch: Cesium.Math.toRadians(-25.0),
                    roll: 0.0
                }
            });
}

function main() 
{
    // loadingObject();
    navigator.geolocation.getCurrentPosition(fly);
}
