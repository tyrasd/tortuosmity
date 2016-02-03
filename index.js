var tilereduce = require('tile-reduce'),
    path = require('path'),
    turf = require('turf'),
    merc = new (require('sphericalmercator'))()

var opts = {
    zoom: 12,
    sources: [{
        name: 'osm',
        //mbtiles: path.join(__dirname, 'data/liechtenstein.mbtiles'),
        mbtiles: path.join(__dirname, 'data/austria.mbtiles'),
        //mbtiles: path.join(__dirname, 'data/italy.mbtiles'),
        raw: true
    }],
    maxWorkers: 4,
    map: __dirname+'/map.js'
}

var tiles = {}

function mapResults(result, saveTo) {
    Object.keys(result).forEach( function(u) {
        counts[u] = (counts[u] ? counts[u] : 0) + result[u];
    });
}

process.stdout.write('{"type": "FeatureCollection","features": [\n')
var stuff = []
var tilereduce = tilereduce(opts)
.on('reduce', function(result, tile){
    //process.stdout.write(tile[0]+' '+tile[1]+' '+result+'\n')
    var bbox = turf.bboxPolygon(merc.bbox(tile[0],tile[1],tile[2]))
    bbox.properties['stroke-width'] = 0
    bbox.properties['fill'] = '#00'+('0'+Math.min(255,Math.round(256*(result-1))).toString(16)).substr(-2)+'00'
    bbox.properties.tort = result
    process.stdout.write(JSON.stringify(bbox)+',\n')
    //console.log('done', tile, result)
    //stuff.push({ tile: tile, tort: result })
    //mapResults(result, counts)
})
.on('end', function() {
    process.stdout.write('{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [0,0]}}\n') // todo: get rid of dummy feature
    process.stdout.write(']}\n')
    //process.stdout.write(JSON.stringify(stuff, null, 4))
    /*stuff.forEach(function(l) {
        process.stdout.write(l.tile[0]+' '+l.tile[1]+' '+l.tort)
    }*/
})
.on('error', function (error) {
    throw error;
})
