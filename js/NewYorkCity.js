/**
 * Created by Almond on 12/2/2016.
 */

var NewYorkCity = function() {

    var main                =   this;

    main.city_pos           =   null;
    main.center_Entity      =   null;

    main.buildingLayer      =   null;
    main.streetLayer        =   null;

    main.prefixUrl          =   "http://www.3dcitydb.net/3dcitydb/fileadmin/mydata/Cesium_NYC_Demo/";

    main.init = function (position){
        main.city_pos       =   position;
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
        showFlying(true);

        viewer.trackedEntity = main.center_Entity;
        main.center_Entity.show = false;
        baverlyHill.center_Entity.show = false;
        isHome = false;
        isNewYork = true;
        isBaverlyHill = false;
        showFlying(false);

        main.addLayer();

        // viewer.camera.flyToBoundingSphere(
        //     new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(main.city_pos.x, main.city_pos.y, 100.0), 200),
        //     {
        //     complete: function () {
        //         main.center_Entity.show = false;
        //         baverlyHill.center_Entity.show = false;
        //         isHome = false;
        //         isNewYork = true;
        //         isBaverlyHill = false;
        //         showFlying(false);

        //         main.addLayer();
        //     },
        //     maximumHeight: 10000000,
        //     orientation : {
        //         heading: Cesium.Math.toRadians(-60),
        //         pitch: Cesium.Math.toRadians(-25.0),
        //         roll: 0.0
        //     }
        // });
    }
    main.addLayer = function() 
    {
        main.addBuildingLayer();
        main.addStreetLayer();
        // main.addLotLayer();
    }

    main.addBuildingLayer = function() 
    {
        main.buildingLayer = new CitydbKmlLayer({
            // url : main.prefixUrl + "NYK_Building_Extruded/NYK_Building_Extruded_MasterJSON_NoJSONP.json",
            url : "./data/Buildings/NYC_Manhattan_Buildings_extruded_MasterJSON.json",
            minLodPixels : 140,
            maxLodPixels : 1.7976931348623157e+308,
            maxSizeOfCachedTiles : 50,
            maxCountOfVisibleTiles : 200,
            thematicDataUrl : "https://www.google.com/fusiontables/DataSource?docid=1ivFBfqsnkv5OlvkQUybgfOSjIz_u9_98_mmJVUss#rows:id=1"
        });
        webMap.addLayer(main.buildingLayer);

        main.buildingLayer.registerEventHandler("FINISHLOADING", function(loadedcitydbLayer) {
            loadedcitydbLayer.zoomToStartPosition();
        });
    }

    main.addStreetLayer = function() 
    {
        main.streetLayer = new CitydbKmlLayer({
            // url : main.prefixUrl + "NYK_Street_Footprint/NYK_Street_Footprint_MasterJSON_NoJSONP.json",
            url : "./data/Streets/NYC_Manhattan_Streets_footprint_MasterJSON.json",
            minLodPixels : 140,
            maxLodPixels : 1.7976931348623157e+308,
            maxSizeOfCachedTiles : 50,
            maxCountOfVisibleTiles : 200,
            thematicDataUrl : "https://www.google.com/fusiontables/data?docid=1qLk_S4yxma0MI1LmISc8DdLn_NdhrFb784Mwizas#rows:id=1"
        });
        webMap.addLayer(main.streetLayer);
    }

    main.removeLayers = function()
    {
        if (main.buildingLayer) {
            webMap.removeLayer(main.buildingLayer.id);
            webMap.removeLayer(main.streetLayer.id);
        }
    }
}