var StreetView = function()
{
    var main = this;
    main.dataSource = null;
    main.ptnPath = "obj/";
    main.render_id = 0;

    main.count = 20;

    main.long = 0;
    main.lat = 0;

    main.buildings = [];

    main.scene = null;

    main.init = function(viewer, dataSource) {
        main.scene = viewer.scene;
        main.dataSource = dataSource;
    }

    main.selectBuilding = -1;

    main.dispObject = function() {

        for (var i = 0; i < main.count; i ++) {
            var x = main.long + Math.cos(Cesium.Math.toRadians(360 * i / main.count)) * Math.random() / 70;
            var y = main.lat +  Math.sin(Cesium.Math.toRadians(360 * i / main.count)) * Math.random() / 70;

            var building = new Building();
            building.init(main.scene, main.dataSource);
            building.setPosition({x:x, y:y});

            var id = "building_" + i;
            var number = Math.floor(Math.random() * 2 + 0.5);

            building.setBuilding(number, id);

            id = "image_" + i;
            building.setImage(number, id);

            building.draw();

            main.buildings.push(building);

        }
    }

    main.setLatLon = function (long, lat) {
        main.long = long;
        main.lat = lat;
    }

    main.initEvent = function () {
        document.addEventListener("click", main.onDocumentMouseClick);
    }

    main.action = function (click) {

        var pickedObject = main.scene.pick(click.position);

        if (Cesium.defined(pickedObject)) {
            console.log("defined");
            for (var i = 0 ; i < main.count; i ++) {
                var building = main.buildings[i];
                if (pickedObject.id === building.image) {
                    // building.gotoStreetView();
                    // main.selectBuilding = i;
                }
                else if (pickedObject.id === building.building) {
                    if (main.selectBuilding != i) {
                        building.gotoEntrance();
                    }
                    main.selectBuilding = i;
                }
            }
        }

    }

    main.moveAction = function(movement) {
        var position = viewer.camera.pickEllipsoid(movement.endPosition);
        var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);

        document.getElementById('longitude').textContent = Cesium.Math.toDegrees(cartographicPosition.longitude);

        document.getElementById('latitude').textContent = Cesium.Math.toDegrees(cartographicPosition.latitude);

    }

    main.enableSpaceEventHandler = function(viewer) {
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(main.action,
            Cesium.ScreenSpaceEventType.LEFT_CLICK
        );
    }

    main.enableCameraMoveEventHandler = function (viewer) {
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(main.moveAction,
            Cesium.ScreenSpaceEventType.MOUSE_MOVE
        );
    }

    main.onDocumentMouseClick = function (event) {
        var position = viewer.camera.pickEllipsoid({x:event.clientX, y:event.clientY});
        var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
        // console.log(Cesium.Math.toDegrees(cartographicPosition.longitude) - main.buildings[main.selectBuilding].pos.x);
        // console.log(Cesium.Math.toDegrees(cartographicPosition.latitude) - main.buildings[main.selectBuilding].pos.y);
    }
}