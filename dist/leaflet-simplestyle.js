(function () {
    'use strict';

    // Pinched from mapbox.js
    // https://github.com/mapbox/mapbox.js/blob/publisher-production/src/simplestyle.js

    // an implementation of the simplestyle spec for polygon and linestring features
    // https://github.com/mapbox/simplestyle-spec
    var defaults = {
        stroke: '#555555',
        'stroke-width': 2,
        'stroke-opacity': 1,
        fill: '#555555',
        'fill-opacity': 0.5
    };

    var mapping = [
        ['stroke', 'color'],
        ['stroke-width', 'weight'],
        ['stroke-opacity', 'opacity'],
        ['fill', 'fillColor'],
        ['fill-opacity', 'fillOpacity']
    ];

    function fallback(a, b) {
        var c = {};
        for (var k in b) {
            if (a[k] === undefined) c[k] = b[k];
            else c[k] = a[k];
        }
        return c;
    }

    function remap(a) {
        var d = {};
        for (var i = 0; i < mapping.length; i++) {
            d[mapping[i][1]] = a[mapping[i][0]];
        }
        return d;
    }

    function style(feature) {
        return remap(fallback(feature.properties || {}, defaults));
    }

    L.GeoJSON.include({
        
        options: {
            useSimpleStyle: false
        },

        _useSimpleStyle: function () {
           if (this.options.useSimpleStyle) this.setStyle(style);
        },

        useSimpleStyle: function () {
           if (!this.options.useSimpleStyle) {
               this.setStyle(style);
               this.options.useSimpleStyle = true;
           }
        },

        discardSimpleStyle: function (newStyle) {
           if (this.options.useSimpleStyle) {
               this.resetStyle();
               this.options.useSimpleStyle = false;
           }
        }
    });

    L.GeoJSON.addInitHook('_useSimpleStyle');

}());
