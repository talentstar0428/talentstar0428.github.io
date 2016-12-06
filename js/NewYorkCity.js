/**
 * Created by Almond on 12/2/2016.
 */

var NewYorkCity = function() {

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
            label : {
                text: 'New York',
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                eyeOffset: new Cesium.Cartesian3(0,0,-30),
                scale   :   5
            },
            show : false
        });
    }

    main.flyTo = function() {
        viewer.trackedEntity = main.center_Entity;
        // viewer.trackedEntity = undefined;
        viewer.camera.flyToBoundingSphere(
            new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(main.city_pos.x, main.city_pos.y, 400.0), 300),
            {
            complete: function () {
                newyork.center_Entity.show = false;
                baverlyHill.center_Entity.show = false;
                isHome = false;
                isNewYork = true;
                isBaverlyHill = false;
            },
            maximumHeight: 10000000,
            orientation : {
                heading: Cesium.Math.toRadians(-60),
                pitch: Cesium.Math.toRadians(-25.0),
                roll: 0.0
            }
        });
    }
}