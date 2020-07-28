var turf = require('turf')

var roadTypes = [
        'motorway',
        'trunk',
        'primary',
        'secondary',
        'tertiary',
        'unclassified',
        'residential'
    ]

module.exports = function (tileLayers, tile, writeData, done) {

    var tortuosities = []

    for (var i = 0; i < tileLayers.osm.osm.length; i++) {
        var feature = tileLayers.osm.osm.feature(i)
        if (roadTypes.indexOf(feature.properties.highway) === -1) continue
        feature = feature.toGeoJSON(tile[0], tile[1], tile[2])
        if (feature.geometry.type !== 'LineString') continue

        var roadLength = turf.lineDistance(feature, 'kilometers'),
            roadDist = turf.distance(
                turf.point(feature.geometry.coordinates[0]),
                turf.point(feature.geometry.coordinates.pop()) // can alter the geometry, as total length has already been calculated
            )
        tortuosities.push({
            dist: roadDist,
            length: roadLength
        })

    }

    var tortuosity = tortuosities.reduce(function(prev, curr) {
        if (curr.dist > 0) { // ignore closed loops ?
            prev.len += curr.length
            prev.tort += Math.min(4, curr.length/curr.dist) * curr.length
        }
        return prev
    }, { len:0, tort:0 })
    tortuosity = tortuosity.tort / tortuosity.len

    done(null, tortuosity);
}


