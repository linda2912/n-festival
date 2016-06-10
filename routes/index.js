var express = require('express');
var router = express.Router();

// GET data 
var fs = require('fs');
var obj;

fs.readFile('./public/data/data.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);

    for (var i = 0; i < obj.length; i++) {
        var nameUrl = 'nameUrl',
            locationUrl = 'locationUrl',
            nameValue = obj[i].header.title.replace(/ /g, "-"),
            locationValue = obj[i].info.location.replace(/ /g, "-"),
            recom = obj[i].recommendations;

        for (var a = 0; a < recom.length; a++) {
            var recomValue = recom[a].title.replace(/ /g, "-");

            recom[a][nameUrl] = recomValue;
        }

        obj[i].info[nameUrl] = nameValue;
        obj[i].info[locationUrl] = locationValue;
    }
});


var http = require('http');

var apiData;

http.get({
    host: 'n-festival.werk.vanjim.nl',
    path: '/wp-json/wp/v2/events'
}, function (response) {
    // Continuously update stream with data
    var body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {

        // Data reception is done, do whatever with it!
        apiData = JSON.parse(body);

        apiData.forEach(function (event) {
            var startArray = event.acf.start_time.split(' '),
                endArray = event.acf.end_time.split(' ');

            var day = startArray[0],
                starttime = startArray[1],
                endtime = endArray[1];
            
            var date = 'date',
                startconvert = 'starttime_converted',
                endconvert = 'endtime_converted';
            
            event.acf[date] = day;
            event.acf[startconvert] = starttime;
            event.acf[endconvert] = endtime;
            



            //                
            //                var month = starttime.getDate();
            //                var day = starttime.getUTCDay();
            //                console.log(day + '-' + month);
        });

    });
});

router.get('/test', function (req, res, next) {
    res.render('test', {
        apiData: apiData
    });
});



// helper function to match data with day,name,location etc.
function findObject(data, arrayOfProps, objectToLookFor) {
    var obj = data.obj;

    var eventArray = [];

    obj.forEach(function (item) {
        var x = item;

        // get the right item from json data (with some help from Casper)
        arrayOfProps.forEach(function (prob) {
            x = x[prob];
        });

        if (x == objectToLookFor) {
            eventArray.push(item);
        }
    });

    return eventArray;
};


// Get home page
router.get('/', function (req, res, next) {

    var data = {
        obj: obj
    };

    var now = new Date(),
        day1 = new Date('October 8, 2016 23:59:59');

    // show events day 1 if it's before day one, otherwise show events day 2
    if (now < day1) {
        var array = findObject(data, ['info', 'date'], '08-10-2016');

        res.render('home', {
            obj: array
        });

    } else {
        var array = findObject(data, ['info', 'date'], '09-10-2016');

        res.render('home', {
            obj: array
        });
    }

});

// get day 1
router.get('/day1', function (req, res, next) {
    var data = {
        obj: obj
    }

    var array = findObject(data, ['info', 'date'], '08-10-2016');

    res.render('home', {
        obj: array
    });

});

// get day 2
router.get('/day2', function (req, res, next) {
    var data = {
        obj: obj
    };

    var array = findObject(data, ['info', 'date'], '09-10-2016');

    res.render('home', {
        obj: array
    });
});

// get events page
router.get('/programpage', function (req, res, next) {
    var data = {
        obj: obj
    };

    // sort by name
    var dataByName = data.obj.slice(0);
    dataByName.sort(function (a, b) {
        var x = a.header.title.toLowerCase();
        var y = b.header.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    res.render('programPage', {
        obj: dataByName
    });
});

// get timetable page
router.get('/myroute', function (req, res, next) {
    res.render('myRoute');
});


router.get('/detail/:name', function (req, res, next) {

    if (req.query.js != undefined) {
        var js = false;
    } else {
        var js = 'layout';
    }

    var data = {
        obj: obj
    };

    var item = findObject(data, ['info', 'nameUrl'], req.params.name);

    res.render('detailEvents', {
        item: item,
        layout: js
    });
});

router.get('/location', function (req, res, next) {
    var data = {
        obj: obj
    };

    res.render('locationList', {
        obj: data
    });
});

router.get('/location/:place', function (req, res, next) {
    var data = {
        obj: obj
    };

    var locationArr = findObject(data, ['info', 'locationUrl'], req.params.place);

    res.render('locationDetail', {
        obj: locationArr
    });
});

router.get('/about', function (req, res, next) {
    res.render('about');
});

router.get('/settings', function (req, res, next) {
    res.render('settings');
});

module.exports = router;