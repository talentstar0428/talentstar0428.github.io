/**
 * Created by Almond on 12/2/2016.
 */

var BaverlyHill = function() {

    var main                =   this;
    var city_pos            =   null;
    var dataSource          =   null;
    var center_Entity       =   null;

    main.init = function (dataSource, position){
        main.city_pos       =   position;
        main.dataSource     =   dataSource;
    }

    main.drawPos = function () {
        main.center_Entity = main.dataSource.entities.add({
            position : Cesium.Cartesian3.fromDegrees(main.city_pos.x, main.city_pos.y),
            // model : {
            //     uri: './3dobject/BeverlyHills/BeverlyHills.gltf',
            //     scale:1
            // },
            ellipse : {
                semiMajorAxis : 10.0,
                semiMinorAxis : 10.0,
                material : Cesium.Color.TRANSPARENT
            },
            label : {
                text: 'Baverly Hills',
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                eyeOffset: new Cesium.Cartesian3(0,0,-30),
            }
        });
    }

    main.flyTo = function() {
        viewer.trackedEntity = main.center_Entity;
        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(main.city_pos.x, main.city_pos.y, 2000.0),
            complete: function () {
                isBaverlyHill = true;
                isNewYork = false;
            },
            maximumHeight: 10000000,
        });
    }
}