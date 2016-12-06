<!DOCTYPE html>
<html lang="en">
<head>
    <title>3D World</title>
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
    <script type="text/javascript" src="js/lib/hammer.min.js"></script>
    <script src="js/Cesium/Cesium.js"></script>
    <script src="js/StreetView.js"></script>
    <script src="js/gyronorm.js"></script>
    <script src="js/building.js"></script>
    <script src="js/NewYorkCity.js"></script>
    <script src="js/BaverlyHill.js"></script>
    <style>
        @import url(js/Cesium/Widgets/widgets.css);
        html, body, #cesiumContainer {
            width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
        }
    </style>
    <link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body>

<div id="preview">
    <div id="previewContent">
        <div id="buttonContainer">
            <div id="altContainer">
                <label>Longitude: </label><span id="longitude">0</span>
                <br>
                <label>Latitude: </label><span id="latitude">0</span>
            </div>
        </div>

        <div id="top_btn_area">
            <button id="New_York" class="abs_btn" onclick="gotoNewYork()">New York</button>
            <button id="BeverlyHill" class="abs_btn" onclick="gotoBeverlyHill()">Beverly Hills</button>
        </div>

        <div id="home_area">
            <img src="./images/home.png" id="Home" alt="Home" onclick="gotoHome()" />
        </div>

        <div id="cesiumContainer"></div>
    </div>
</div>

<div id="popup">
    <center id="pos_info">Lat : 0.00, Lng : 0.00</center>
    <center>URL : http://test.com</center>
</div>

<script>
    Cesium.BingMapsApi.defaultKey = 'AsarFiDvISunWhi137V7l5Bu80baB73npU98oTyjqKOb7NbrkiuBPZfDxgXTrGtQ';
    var viewer = new Cesium.Viewer('cesiumContainer', {
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

    var mousedown = false;

    var isNewYork = false;

    var isBaverlyHill = false;

    var isHome = false;

    var newyork = new NewYorkCity();

    var baverlyHill = new BaverlyHill();

    var street;

    function handleOrientation(event) {

        var z = event.alpha;
        var x = event.beta;
        var y = event.gamma;

        if (this.mousedown == false) {

            viewer.camera.rotateLeft(y / 1000);
        }

    }

    function gotoNewYork() {
        if (isNewYork == false) {
            street.moveSelectBuildingOrigin();
            newyork.flyTo();
        }
    }

    function gotoBeverlyHill() {
        if (isBaverlyHill == false) {
            street.moveSelectBuildingOrigin();
            baverlyHill.flyTo();
        }
    }

    function gotoHome() {
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

    window.onmousedown = onMouseDown;
    window.onmouseup = onMouseUp;

    function onMouseDown(event) {
        this.mousedown = true;
    }
    function onMouseUp(event) {
        this.mousedown = false;
    }

    var man = null;

    var current_pos = null;

    var xDown = null;                                                        
    var yDown = null;

    var cesiumContainer = document.getElementById("cesiumContainer");

    var doubleTapEntity = null;

    function fly(position) {

        viewer.shadowMap.lightCamera = viewer.camera;

        var source = new Cesium.CustomDataSource();
        current_pos = position;
        viewer.dataSources.add(source);

        man = new Cesium.Entity({
            position : Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude),
            id: 'man',
            ellipse : {
                semiMajorAxis : 500.0,
                semiMinorAxis : 500.0,
                material : Cesium.Color.TRANSPARENT,
            },
        });

        doubleTapEntity = new Cesium.Entity({
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

        baverlyHill.init(source, {x: -118.3994444, y: 34.0736111});

        baverlyHill.drawPos();

        newyork.center_Entity.show = false;
        baverlyHill.center_Entity.show = false;


        street.initEvent();

        this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        this.viewer.screenSpaceEventHandler.destroy();

        function initEventOrientation() {
            // window.addEventListener("deviceorientation", handleOrientation);
            isHome = true;
            var controller = viewer.scene.screenSpaceCameraController;
            controller.enableRotate = false;

            Hammer(cesiumContainer).on("panleft", onLeftSwipe);
            Hammer(cesiumContainer).on("panright", onRightSwipe);
            Hammer(cesiumContainer).on("panup", onUpMove);
            Hammer(cesiumContainer).on("pandown", onDownMove);
            Hammer(cesiumContainer).on("doubletap", onDoubleTap);
        }

        function onLeftSwipe(event) {
            viewer.camera.rotateLeft(Cesium.Math.toDegrees(0.0003));
        }

        function onRightSwipe(event) {
            viewer.camera.rotateRight(Cesium.Math.toDegrees(0.0003));
        }

        function onUpMove(event) {
            if (street.selectBuilding == -1)
                viewer.camera.moveDown(20);
            else viewer.camera.rotateDown(Cesium.Math.toDegrees(0.002));
        }

        function onDownMove(event) {
            if (street.selectBuilding == -1)
                viewer.camera.moveUp(20);
            else viewer.camera.rotateUp(Cesium.Math.toDegrees(0.002));
        }

        function onDoubleTap(event) {
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

    navigator.geolocation.getCurrentPosition(fly);
</script>
</body>
</html>
