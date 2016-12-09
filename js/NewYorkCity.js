/**
 * Created by Almond on 12/2/2016.
 */

var NewYorkCity = function() {

    var main                =   this;
    var city_pos            =   null;
    var center_Entity       =   null;
    var webMap              =   null;
    var buildingLayer       =   null;
    var lotLayer            =   null;
    var streetLayer         =   null;

    main.init = function (position){
        main.city_pos       =   position;

        main.webMap         = new WebMap3DCityDB(viewer);
        main.webMap.activateViewChangedEvent(true);
    }

    main.drawPos = function () {
        main.center_Entity = viewer.entities.add({
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
                
                // var extent = new Cesium.Rectangle.fromDegrees(-74.2554618991863, 40.4984065460536, -73.6992741782758, 40.9147033697977);
                // viewer.camera.setView({destination: extent})

                // main.addLayer();
            },
            maximumHeight: 10000000,
            orientation : {
                heading: Cesium.Math.toRadians(-60),
                pitch: Cesium.Math.toRadians(-25.0),
                roll: 0.0
            }
        });
    }
    main.addLayer = function() 
    {
        main.addBuildingLayer();
        // main.addLotLayer();
        // main.addStreetLayer();
    }

    main.addBuildingLayer = function() 
    {
        main.buildingLayer = new CitydbKmlLayer({
            url : './data/Buildings/NYC_Manhattan_Buildings_extruded_MasterJSON.json',
        });

        main.webMap.addLayer(main.buildingLayer);

        main.buildingLayer.registerEventHandler("FINISHLOADING", function(loadedcitydbLayer) {
            loadedcitydbLayer.zoomToStartPosition();
        }); 
    }

    main.addLotLayer = function()
    {
        main.lotLayer = new CitydbKmlLayer({
            url : './data/Lots/NYC_Manhattan_Lots_footprint_MasterJSON.json'
        });
        main.webMap.addLayer(main.lotLayer);
    }

    main.addStreetLayer = function() 
    {
        main.streetLayer = new CitydbKmlLayer({
            url : './data/Streets/NYC_Manhattan_Streets_footprint_MasterJSON.json'
        });
        main.webMap.addLayer(main.streetLayer);
    }

    main.removeLayers = function()
    {
        main.webMap.removeLayer(main.buildingLayer.id);
        main.webMap.removeLayer(main.lotLayer.id);
        main.webMap.removeLayer(main.streetLayer.id);
    }
}