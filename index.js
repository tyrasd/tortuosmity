var tilereduce = require('tile-reduce'),
    path = require('path'),
    turf = require('turf')

var opts = {
    zoom: 12,
    sources: [{
        name: 'osm',
        mbtiles: path.join(__dirname, process.argv[2]),
        raw: true
    }],
    map: __dirname+'/map.js'
}

var tilereduce = tilereduce(opts)
.on('reduce', function(result, tile){
    process.stdout.write(tile[0]+'\t'+tile[1]+'\t'+result+'\n')
})
.on('end', function() {
})
.on('error', function (error) {
    throw error;
})
