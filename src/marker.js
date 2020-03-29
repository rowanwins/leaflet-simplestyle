'use strict';

// Pinched from mapbox.js
// https://github.com/mapbox/mapbox.js/blob/publisher-production/src/marker.js

import sanitize from '@mapbox/sanitize-caja';

function strip_tags (_) {
    return _.replace(/<[^<]+>/g, '');
}

// mapbox-related markers functionality provide an icon from
// mapbox's simple-style spec and hosted markers service
function icon (fp, options) {
    fp = fp || {};

    var sizes = {
            small: [20, 50],
            medium: [30, 70],
            large: [35, 90]
        },
        size = fp['marker-size'] || 'medium',
        // see valid symbols https://labs.mapbox.com/maki-icons/
        symbol = ('marker-symbol' in fp && fp['marker-symbol'] !== '') ? '-' + fp['marker-symbol'] : '',
        color = (fp['marker-color'] || '7e7e7e').replace('#', '');

    return L.icon({
        // from http://bl.ocks.org/tmcw/3861338
        iconUrl: '//a.tiles.mapbox.com/v3/marker/pin-' +
            // Internet Explorer does not support the `size[0]` syntax.
            size.charAt(0) + symbol + '+' + color + (L.Browser.retina ? '@2x' : '') + '.png',
        iconSize: sizes[size],
        iconAnchor: [sizes[size][0] / 2, sizes[size][1] / 2],
        popupAnchor: [0, -sizes[size][1] / 2]
    });
}

// a factory that provides markers for Leaflet from Mapbox's
// [simple-style specification](https://github.com/mapbox/simplestyle-spec)
// and [Markers API](http://mapbox.com/developers/api/#markers).
export default function markerStyle (f, latlon, options) {
    return L.marker(latlon, {
        icon: icon(f.properties, options),
        title: strip_tags(sanitize((f.properties && f.properties.title) || ''))
    });
}
