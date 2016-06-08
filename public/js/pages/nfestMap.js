/* Namespacing nfest to avoid conflicts with other code like libraries */
var nfest = nfest || {};
'use strict';

nfest.map = (function () {

    var mapLauncher = function () {
        var mapOptions = {
            mapTypeControlOptions: {
                mapTypeIds: ['Styled'],
            },
            zoom: 14,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            mapTypeId: 'Styled'
        };

        var map = new google.maps.Map(document.getElementById("locationMap"), mapOptions);

        nfest.map.jsActivate(map);
        nfest.map.mapStyle(map);
        nfest.map.getLocation(map);
        nfest.map.venueMarkers(map);
    }

    var jsActivate = function (map) {
        var locationMap = document.getElementById('locationMap');
        locationMap.classList.remove('hide');
    }

    var mapStyle = function (map) {
        var styles = [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e9e9e9"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }, {
                "lightness": 21
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dedede"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#333333"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f2f2f2"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#fefefe"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#fefefe"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]

        var styledMapType = new google.maps.StyledMapType(styles, {
            name: 'Styled'
        });
        map.mapTypes.set('Styled', styledMapType);
    }

    var getLocation = function (map) {
        // check if geolocation is supported
        if (navigator.geolocation) {

            nfest.helpers.storageCheck(function (hasStorage) {
                if (hasStorage) {
                    if (localStorage.getItem("userCoordinates") === null) {
                        navigator.geolocation.getCurrentPosition(success, error);

                        function success(position) {
                            var userLatitude = position.coords.latitude;
                            var userLongitude = position.coords.longitude;
                            var userCoordinates = [userLatitude, userLongitude];
                            localStorage.setItem('userCoordinates', JSON.stringify(userCoordinates));

                            map.panTo({
                                lat: userLatitude,
                                lng: userLongitude
                            });

                            nfest.map.setMarker(map, userLatitude, userLongitude);
                        };

                        function error() {
                            console.log('Unable to get your position.');

                            // set map on Amsterdam Noord
                            var latLng = new google.maps.LatLng(52.391286, 4.917583);
                            map.panTo(latLng);
                        };

                    } else {
                        var userCoordinates = JSON.parse(localStorage.getItem('userCoordinates'));

                        map.panTo({
                            lat: userCoordinates[0],
                            lng: userCoordinates[1]
                        });

                        nfest.map.setMarker(map, userCoordinates[0], userCoordinates[1]);
                    }

                } else {
                    navigator.geolocation.getCurrentPosition(success, error);

                    function success(position) {
                        var userLatitude = position.coords.latitude;
                        var userLongitude = position.coords.longitude;

                        map.panTo({
                            lat: userLatitude,
                            lng: userLongitude
                        });

                        nfest.map.setMarker(map, userLatitude, userLongitude);
                    };

                    function error() {
                        console.log('Unable to get your position.');

                        // set map on Amsterdam Noord
                        var latLng = new google.maps.LatLng(52.391286, 4.917583);
                        map.panTo(latLng);
                    };
                }
            });


        } else {
            console.log('Geolocation is turned off or not supported, we cant calculate your location.');

            // set map on Amsterdam Noord
            var latLng = new google.maps.LatLng(52.391286, 4.917583);
            map.panTo(latLng);
        }
    }

    var setMarker = function (map, userLat, userLong) {
        var marker = new google.maps.Marker({
            map: map,
            icon: '/img/marker.gif',
            optimized: false,
            title: 'First Infowindow!'
        });

        var contentString =
            '<div id="content">' +
            '<p>' +
            location.address +
            '</p>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.setMap(map);
        marker.setPosition(new google.maps.LatLng(userLat, userLong));
        map.setCenter(marker.getPosition());
    }

    var venueMarkers = function (map) {

        nfest.helpers.getVenueLocations(function (mapLocations, data) {
            var locationMarkers = mapLocations;
            
            locationMarkers.forEach(function (location) {

                var marker = new google.maps.Marker({
                    position: {
                        lat: location.lat,
                        lng: location.lng
                    },
                    map: map,
                    title: 'First Infowindow!'
                });

                var locationLink = location.title.replace(/ /g, "-");

                var link = '<a href="/location/' + locationLink + '">';

                var contentString =
                    '<div id="content">' +
                    '<h1>' +
                    location.title +
                    '</h1>' +
                    '<p>' +
                    location.address +
                    '</p>' +
                    '<a href="#">' +
                    'Route beschrijving' +
                    '</a>' +
                    '   |   ' +
                    link +
                    'Bekijk evenementen' +
                    '</a>' +
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                    map.setCenter(marker.getPosition());
                });

                marker.setMap(map);

            });
        });

    }

    return {
        mapLauncher: mapLauncher,
        jsActivate: jsActivate,
        mapStyle: mapStyle,
        getLocation: getLocation,
        setMarker: setMarker,
        venueMarkers: venueMarkers
    }

})();

nfest.map.mapLauncher();