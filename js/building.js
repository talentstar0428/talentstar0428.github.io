var Building = function()
{
    var main = this;

    main.pos = null;

    main.building = null;

    main.image = null;

    main.height = 0;

    main.scene = null;

    main.dataSource = null;

    main.heightArray = [
        55,
        90,
        55,
        55
    ];

    main.entrance_path_pos_array_x = [
        0.0000339996881280058,
        0.000014243552428183648,
        -0.000005612046905412171,
    ];

    main.entrance_path_pos_array_y = [
        -0.00020933833075531538,
        -0.0002612784262012724,
        -0.00022322242827499394
    ];

    main.entrance_pos_array_x = [
        0.000031203612437025185,
        0.000014541667624712318,
        -0.000008614274207729977,
    ];

    main.entrance_pos_array_y = [
        0.000048220073750826487,
        -0.00006320785134050766,
        0.000004138009423115818,
    ];

    main.uri_obj = [
        './3dobject/house1/exterior-p0b.gltf',
        './3dobject/house2/exterior-p0a.gltf',
        './3dobject/house3/exterior-p0c.gltf'
    ];

    main.entrance = null;

    main.entrance_pos = null;

    main.entrance_path = null;

    main.entrance_path_pos = null;

    main.entrance_height = 0;

    main.direction = 0;

    main.index = 0;

    main.init = function (scene, dataSource) {
        main.scene = viewer.scene;
        main.dataSource = dataSource;
    }

    main.setPosition = function (position) {
        main.pos = position;
    }

    main.setHeight = function (height) {
        main.height = height;
    }

    main.scale = 3;

    main.gotoEntrance = function () {
        var heading = main.direction;
        if (main.index == 1) heading = main.direction;

        viewer.trackedEntity = main.entrance;
        viewer.camera.flyTo({
            destination : main.entrance_path_pos,
            orientation : {
                heading : Cesium.Math.toRadians(heading),
                pitch : Cesium.Math.toRadians(0.0),
                roll : 0.0
            },
            maximumHeight: 1000,
            complete: function() {
                /*
                viewer.trackedEntity = main.entrance;
                viewer.camera.flyTo({
                    destination : main.entrance_pos,
                    maximumHeight: main.entrance_height,
                    orientation : {
                        heading : Cesium.Math.toRadians(heading),
                        pitch : Cesium.Math.toRadians(0.0),
                        roll : 0.0
                    },
                });
                */
            }
        });

    }

    main.gotoStreetView = function () {
        viewer.trackedEntity = main.image;
    }

    main.setBuilding = function (number, id) {
        main.direction = 0;

        var entity = new Cesium.Entity({
            position : Cesium.Cartesian3.fromDegrees(main.pos.x, main.pos.y, 0),
            id: id,
            model: {
                uri: main.uri_obj[number],
                scale:main.scale
            },
            orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees(main.pos.x, main.pos.y, 0),
                new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(main.direction), 0, 0))
        });
        main.building = entity;

        var dx = main.entrance_pos_array_x[number] * main.scale;
        var dy = main.entrance_pos_array_y[number] * main.scale;
        var length = Math.sqrt(dx * dx + dy * dy);
        var dy1 = Math.sin(- Cesium.Math.toRadians(main.direction) + Math.atan(dy / dx)) * length;
        var dx1 = Math.cos(- Cesium.Math.toRadians(main.direction) + Math.atan(dy / dx)) * length;
        dx1 = dx;
        dy1 = dy;

        var position = Cesium.Cartesian3.fromDegrees(main.pos.x + dx1, main.pos.y + dy1, 7);
        main.entrance_pos = position;
        main.entrance_height = 2;
        main.entrance = new Cesium.Entity({
            position: position,
            point : {
                show : false, // default
                color : Cesium.Color.SKYBLUE, // default: WHITE
                pixelSize : 4, // default: 1
                outlineColor : Cesium.Color.YELLOW, // default: BLACK
                outlineWidth : 4 // default: 0
            }
            });

        var dx = main.entrance_path_pos_array_x[number] * main.scale;
        var dy = main.entrance_path_pos_array_y[number] * main.scale;
        var length = Math.sqrt(dx * dx + dy * dy);
        var dy1 = Math.sin(- Cesium.Math.toRadians(main.direction) + Math.atan(dy / dx)) * length;
        var dx1 = Math.cos(- Cesium.Math.toRadians(main.direction) + Math.atan(dy / dx)) * length;
        dx1 = dx;
        dy1 = dy;

        var position = Cesium.Cartesian3.fromDegrees(main.pos.x + dx1, main.pos.y + dy1, 7);
        main.entrance_path_pos = position;
        main.entrance_path = new Cesium.Entity({
            position: position,
            point : {
                show : false, // default
                color : Cesium.Color.SKYBLUE, // default: WHITE
                pixelSize : 4, // default: 1
                outlineColor : Cesium.Color.YELLOW, // default: BLACK
                outlineWidth : 4 // default: 0
            }
        });
        main.index = number;
        main.height = main.heightArray[number];
    }

    main.setImage = function(number, id) {
        var index = Math.floor(Math.random() * 11) % 3;
        var name = "./images/photo_" + index + ".png";

        var dx = 0.00005;
        var dy = 0.00005;
        if (number == 0) {
            dx = 0.00005;
            dy = 0.00005;
        }
        else if (number == 1) {
            dx = 0.00005;
            dy = 0.00005;
        }
        var length = Math.sqrt(dx * dx + dy * dy);
        var dy1 = Math.sin(- Cesium.Math.toRadians(main.direction) + Math.atan(dy / dx)) * length
        var dx1 = Math.cos(- Cesium.Math.toRadians(main.direction) + Math.atan(dy / dx)) * length

        var position = Cesium.Cartesian3.fromDegrees(main.pos.x + dx1, main.pos.y + dy1, main.height);

        var entity = new Cesium.Entity( {
            position : position,
            id:id,
            billboard : {
                image   : name, // default: undefined
                width   : 50,
                height  : 50
            }
        });

        main.image = entity;
    }

    main.draw = function() {
        main.dataSource.entities.add(main.building);
        main.dataSource.entities.add(main.image);
        main.dataSource.entities.add(main.entrance);
    }

}