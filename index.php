﻿<!DOCTYPE html>
<html lang="en">
<head>
    <!--
    See https://github.com/AnalyticalGraphicsInc/cesium-google-earth-examples/blob/master/LICENSE.md

    Original Work:

    Copyright 2008 Google Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    -->
    <title>3D World</title>
    <script type="text/javascript" src="js/lib/jquery.min.js"></script>
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

    var newyork = new NewYorkCity();

    var baverlyHill = new BaverlyHill();

    var street;

    function handleOrientation(event) {

        var z = event.alpha;
        var x = event.beta;
        var y = event.gamma;

        if (this.mousedown == false) {

            viewer.camera.rotateLeft(y / 1000);
//            viewer.camera.rotateUp(x / 1000);
//            viewer.camera.rotateLeft(y / 1000);
//            viewer.camera.rotateUp(x / 1000);
        }

    }

    function gotoNewYork() {

//        var cartographicPosition = viewer.camera.positionCartographic;
//
//        console.log(Cesium.Math.toDegrees(cartographicPosition.longitude) - current_pos.coords.longitude);
//        console.log(Cesium.Math.toDegrees(cartographicPosition.latitude) - current_pos.coords.latitude);
//        console.log(viewer.camera.heading);
//        console.log(viewer.camera.pitch);
//        console.log(viewer.camera.roll);
//
//        viewer.camera.setView({
//            destination : Cesium.Cartesian3.fromDegrees(current_pos.coords.longitude, current_pos.coords.latitude, 2000.0),
//
//
//        });
//
//        return;

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
        if (isNewYork || isBaverlyHill) {
            viewer.trackedEntity = man;
            // viewer.trackedEntity = undefined;
            street.moveSelectBuildingOrigin();
            viewer.scene.camera.flyToBoundingSphere(
                new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(current_pos.coords.longitude, current_pos.coords.latitude, 400.0), 300),
                {
                    maximumHeight: 10000000,
                    complete: function () {
                        newyork.center_Entity.show = false;
                        baverlyHill.center_Entity.show = false;
                        isBaverlyHill = false;
                        isNewYork = false;
                    },
                    orientation : {
                        heading: Cesium.Math.toRadians(-60),
                        pitch: Cesium.Math.toRadians(-25.0),
                        roll: 0.0
                    }
                });
//            viewer.camera.flyTo({
//                destination : Cesium.Cartesian3.fromDegrees(current_pos.coords.longitude + 200 / 10000, current_pos.coords.latitude - 100 / 10000, 1000.0),
//                complete: function () {
//                    isBaverlyHill = false;
//                    isNewYork = false;
//                },
//                maximumHeight: 10000000,
//                orientation : {
//                    heading: Cesium.Math.toRadians(-60),
//                    pitch: Cesium.Math.toRadians(-25.0),
//                    roll: 0.0
//                }
//            });
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

    function fly(position) {

        viewer.shadowMap.lightCamera = viewer.camera;

        var source = new Cesium.CustomDataSource();
        current_pos = position;

        viewer.dataSources.add(source);

        man = new Cesium.Entity({
            position : Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude),
            id: 'man',
            ellipse : {
                semiMajorAxis : 700.0,
                semiMinorAxis : 700.0,
                material : Cesium.Color.TRANSPARENT,
            },
        });

        source.entities.add(man);

        viewer.trackedEntity = man;
        // viewer.trackedEntity = undefined;

        street = new StreetView();
        street.init(viewer, source);

        street.setLatLon(position.coords.longitude, position.coords.latitude);

        street.dispObject();

        street.enableSpaceEventHandler(viewer);

        street.enableCameraMoveEventHandler(viewer);

        newyork.init(source, {x:    -73.985130, y:  40.758896});

        newyork.drawPos();

        baverlyHill.init(source, {x:  -118.3994444, y:   34.0736111});

        baverlyHill.drawPos();

        newyork.center_Entity.show = false;
        baverlyHill.center_Entity.show = false;


       // street.initEvent();

        this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

        function initEventOrientation() {
            // window.addEventListener("deviceorientation", handleOrientation);
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

//        viewer.scene.camera.flyTo({
//            destination : Cesium.Cartesian3.fromDegrees(position.coords.longitude  + 200 / 10000, position.coords.latitude - 100 / 10000, 1000.0),
//            complete: initEventOrientation,
//            orientation : {
//                heading: Cesium.Math.toRadians(-60),
//                pitch: Cesium.Math.toRadians(-25.0),
//                roll: 0.0
//            }
//        });
    }



    // Ask browser for location, and fly there.
    navigator.geolocation.getCurrentPosition(fly);

    // Comparable Google Earth API code:
    //
    // https://code.google.com/p/earth-api-samples/source/browse/trunk/demos/geolocation/index.html

</script>
</body>
</html>
