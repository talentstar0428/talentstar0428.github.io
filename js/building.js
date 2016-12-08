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
        65,
        100,
        65,
        65
    ];

    main.entrance_path_pos_array_x = [
        0.00008810836979478154 / 2,
        0.000075267218647923074 / 2,
        0.00002184520759840325 / 2,
    ];

    main.entrance_path_pos_array_y = [
        -0.0006251425159220503 / 2,
        -0.0011989758017136864 / 2 ,
        -0.0011339912153793819 / 2
    ];

    main.entrance_pos_array_x = [
        0.00030431056424617965 / 9,
        0.000148711148185043385 / 9,
        -0.00004707060763564641 / 9,
    ];

    main.entrance_pos_array_y = [
        -0.0007382109912050793 / 9,
        -0.0008567573994788802 / 9,
        -0.0008671437243563673 / 9,
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

    main.image_position = null;

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

    main.scale = 2;

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
                main.image.position = main.entrance_pos;
                isBuildingZoom = true;
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
                scale: main.scale,
                shadows : Cesium.ShadowMode.DISABLED
            },
            orientation: Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees(main.pos.x, main.pos.y, 0),
                new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(main.direction), 0, 0))
        });
        main.building = entity;

        entity.primitive

        var dx = main.entrance_pos_array_x[number] * main.scale;
        var dy = main.entrance_pos_array_y[number] * main.scale;
        var length = Math.sqrt(dx * dx + dy * dy);
        var dy1 = Math.sin(- Cesium.Math.toRadians(main.direction) + Math.atan(dy / dx)) * length;
        var dx1 = Math.cos(- Cesium.Math.toRadians(main.direction) + Math.atan(dy / dx)) * length;
        dx1 = dx;
        dy1 = dy;

        var position = Cesium.Cartesian3.fromDegrees(main.pos.x + dx1, main.pos.y + dy1, 3 * main.scale);
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

        var position = Cesium.Cartesian3.fromDegrees(main.pos.x + dx1, main.pos.y + dy1, 3 * main.scale);
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
        main.height = main.heightArray[number] / 3 * main.scale;
    }

    main.setImage = function(number, id, photo_id) {
        var name = "./images/photo_" + photo_id + ".png";

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
        main.image_position = position;
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

    main.imageMoveOriginal = function() {
        main.image.position = main.image_position;
    }

}