tortuOSMity
===========

Calculates road-curviness from OpenStreetMap data using [osm-qa-tiles](http://osmlab.github.io/osm-qa-tiles/) and [tile-reduce](https://github.com/mapbox/tile-reduce).

Here, the curviness is defined as the average quotient between road length and end-to-end beeline distance of each osm way tagged as a highway (primary, …, residential) in each zoom-level 12 mercator tile. Each pixel in the output corresponds to one of these tiles and is colored according from violet (where the length quotient is near 1 which means almost straight roads) to red (quotient >= 2).

how to
------

    $ npm install
    <install gnuplot, parallel, optipng, imagemagick>
    $ node index.js "path to planet.mbtiles" > world.txt
    $ gnuplot plot.gp
    $ cd tiles
    $ for i in {0..15}; do mkdir $i; done
    $ convert ../world.png -crop 256x256 -set filename:tile "%[fx:page.x/256]/%[fx:page.y/256]" +repage +adjoin "%[filename:tile].png"
    $ find -type f | parallel optipng

result
------

[![](https://raw.githubusercontent.com/tyrasd/tortuosmity/gh-pages/thumb.png)](https://tyrasd.github.io/tortuosmity/)

[(click for world map)](https://tyrasd.github.io/tortuosmity/)

see also
--------

* https://github.com/rory/openstreetmap-bendy-roads
* https://github.com/adamfranco/curvature
