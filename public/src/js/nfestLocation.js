/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

/* Location functions and distance to event */

nfest.location = (function () {

    /* Launcher function */
    var locationLauncher = function () {
        nfest.location.getUserLocation();
        nfest.location.watchLocation();

        if (window.location.pathname == '/program' || '/day1' || '/day2' || '/location' || '/myroute' || '/discover') {
            nfest.location.eventDistance();
        }
        if (window.location.pathname == '/detail/:id') {
            nfest.location.eventDistance();
        }

    };

    /* All functions for getting the user location & coordinates */
    var getUserLocation = function () {

        /* Error handling. Removes bike distance when geolocation is not retrieved */
        var removeBikeDist = function () {
            if (window.location.pathname == '/program' || '/day1' || '/day2' || '/location' || '/myroute' || '/detail' || 'discover') {
                var bikeDist = document.querySelectorAll('.eventDistance');

                Array.prototype.forEach.call(bikeDist, function (item) {
                    item.classList.add('hide');
                });
            }
        }

        /* Error handling. Shows popup when geolocation is not retrieved */
        var showGeoPopUp = function () {

            nfest.helpers.storageCheck(function (hasStorage) {
                var popUp = document.querySelector('.geolocationAlert'),
                    sub = document.querySelector('.subAlert');

                popUp.innerHTML += 'We kunnen je positie niet bepalen doordat je GPS uitstaat of niet goed werkt, zet deze aan voor optimaal gebruik.';

                var closeButton = popUp.querySelector('button');

                if (hasStorage) {
                    if (localStorage.getItem('geoPopup') === null) {
                        popUp.classList.remove('hide');
                        sub.classList.remove('hide');

                        nfest.helpers.onclick(closeButton, function () {
                            popUp.classList.add('hide');
                            sub.classList.add('hide');

                            localStorage.setItem('geoPopup', 'closed');
                        });
                    }
                } else {
                    popUp.classList.remove('hide');
                    sub.classList.remove('hide');
                    closeButton.classList.add('hide');
                }

            });
        }

        /* Check if geolocation and Local Storage is supported and set user coordinates */
        if (navigator.geolocation) {
            nfest.helpers.storageCheck(function (hasStorage) {
                if (hasStorage) {
                    if (localStorage.getItem('userCoordinates') === null) {
                        navigator.geolocation.getCurrentPosition(success, error);

                        function success(position) {
                            var userLatitude = position.coords.latitude,
                                userLongitude = position.coords.longitude,
                                userCoordinates = [userLatitude, userLongitude];
                            localStorage.setItem('userCoordinates', userCoordinates);
                        };

                        function error() {
                            /* Error handling, show popup with info and hide bike distance */
                            showGeoPopUp();
                            removeBikeDist();
                        };

                    }
                } else {
                    navigator.geolocation.getCurrentPosition(success, error);

                    function success(position) {
                        var userLatitude = position.coords.latitude,
                            userLongitude = position.coords.longitude,
                            userCoordinates = [userLatitude, userLongitude];
                    };

                    function error() {
                        /* Error handling, show popup with info and hide bike distance */
                        showGeoPopUp();
                        removeBikeDist();
                    };
                }
            });

        } else {
            /* Error handling, show popup with info and hide bike distance */
            showGeoPopUp();
            removeBikeDist();
        }
    }

    /* When user location changes, change coordinates in Local storage */
    var watchLocation = function (map) {

        if (navigator.geolocation) {
            function success(position) {
                var userLatitude = position.coords.latitude,
                    userLongitude = position.coords.longitude,
                    userCoordinates = [userLatitude, userLongitude];
                localStorage.setItem('userCoordinates', userCoordinates);
            };

            function error() {};

            var options = {
                enableHighAccuracy: true
            }

            navigator.geolocation.watchPosition(success, error, options);
        } else {
            console.log('Geolocation is turned off or not supported, we cant calculate your location.');
        }
    }

    /* Calculate and show distance from user to event location */
    var eventDistance = function () {

        /* Get all events data and run "calculate distance" function */
        nfest.helpers.getData('https://nfest.lisaklein.nl/data', function (response) {
            var data = JSON.parse(response);
            calculateDist(data);
            setInterval(function () {
                calculateDist(data);
            }, 10000);
        });

        /* Get all events and retrieve user coordinates */
        var calculateDist = function (data) {
            var eventList = document.querySelectorAll('.eventObj'),
                allDistances = [];

            if (localStorage.getItem('userCoordinates') === null) {
                navigator.geolocation.getCurrentPosition(success);

                function success(position) {
                    var userLat = position.coords.latitude,
                        userLng = position.coords.longitude,
                        userCoordinates = [userLat, userLng];
                    localStorage.setItem('userCoordinates', userCoordinates);

                    calculate(userLat, userLng);
                };
            } else {
                var userCoordinates = localStorage.getItem('userCoordinates'),
                    userC = userCoordinates.split(','),
                    userLat = parseFloat(userC[0]),
                    userLng = parseFloat(userC[1]);

                calculate(userLat, userLng);
            }

            /* Check user and event coordinates */
            function calculate(userLat, userLng) {
                Array.prototype.forEach.call(eventList, function (event) {
                    var location = event.dataset.location;
                    for (var i = 0; i < data.length; i++) {
                        var id = data[i].slug,
                            uLat = userLat,
                            uLng = userLng,
                            lat = data[i].acf.location.lat,
                            lng = data[i].acf.location.lng;
                        if (location === id) {
                            distance(id, uLat, uLng, lat, lng, event);
                        }
                    }
                });

                /* Calculate distance with coordinates, code by https://www.geodatasource.com/developers/javascript */
                function distance(id, lat1, lon1, lat2, lon2, event) {
                    var unit = 'K',
                        radlat1 = Math.PI * lat1 / 180,
                        radlat2 = Math.PI * lat2 / 180,
                        theta = lon1 - lon2,
                        radtheta = Math.PI * theta / 180,
                        dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta),
                        dist = Math.acos(dist),
                        dist = dist * 180 / Math.PI,
                        dist = dist * 60 * 1.1515;
                    
                    if (unit == 'K') {
                        dist = dist * 1.609344
                    }
                    if (unit == 'N') {
                        dist = dist * 0.8684
                    }

                    var result = dist.toFixed(2),
                        bikeTime = 6 * result,
                        string = '.bikeDist',
                        bikeTime = bikeTime.toFixed(0);

                    allDistances.push({
                        distance: result
                    });

                    event.querySelector(string).innerHTML = bikeTime + ' min';

                }
            }

        }

    }

    return {
        locationLauncher: locationLauncher,
        getUserLocation: getUserLocation,
        watchLocation: watchLocation,
        eventDistance: eventDistance
    }

})();

/* Launcher */
nfest.location.locationLauncher();