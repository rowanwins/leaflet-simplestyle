(function () {
    'use strict';

    // Pinched from mapbox.js
    // https://github.com/mapbox/mapbox.js/blob/publisher-production/src/simplestyle.js

    // an implementation of the simplestyle spec for polygon and linestring features
    // https://github.com/mapbox/simplestyle-spec
    const defaults = {
        stroke: '#555555',
        'stroke-width': 2,
        'stroke-opacity': 1,
        fill: '#555555',
        'fill-opacity': 0.5
    };

    const mapping = [
        ['stroke', 'color'],
        ['stroke-width', 'weight'],
        ['stroke-opacity', 'opacity'],
        ['fill', 'fillColor'],
        ['fill-opacity', 'fillOpacity']
    ];

    function fallback(a, b) {
        const c = {};
        for (const k in b) {
            if (a[k] === undefined) c[k] = b[k];
            else c[k] = a[k];
        }
        return c;
    }

    function remap(a) {
        const d = {};
        for (let i = 0; i < mapping.length; i++) {
            d[mapping[i][1]] = a[mapping[i][0]];
        }
        return d;
    }


    function style(feature) {
        return remap(fallback(feature.properties || {}, defaults));
    }


    // Pinched from mapbox.js
    // https://github.com/mapbox/mapbox.js/blob/publisher-production/src/marker.js
    function getIcon(fp) {
        fp = fp || {};
        const sizes = {
                small: [20, 25],
                medium: [30, 39],
                large: [35, 45]
            },
            size = fp['marker-size'] || 'medium',
            color = (fp['marker-color'] || '7e7e7e').replace('#', '');

        const svg = `<svg width='354' height='458' xmlns='http://www.w3.org/2000/svg'><path d='M177 0C79 0 0 79 0 177c0 95 163 270 170 277a9 9 0 0013 0c7-7 170-182 170-277C353 79 274 0 177 0z' fill='#${color}'/></svg>`;
        return L.icon({
            iconUrl: encodeURI(`data:image/svg+xml,${svg}`).replace('#', '%23'),
            iconSize: sizes[size],
            iconAnchor: [sizes[size][0] / 2, sizes[size][1]],
            popupAnchor: [0, -sizes[size][1] / 2]
        });
    }

    L.GeoJSON.include({

        options: {
            useSimpleStyle: false,
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: getIcon(feature.properties)
                });
            }
        },

        _useSimpleStyle: function () {
            if (this.options.useSimpleStyle) this.setStyle(style);
        },

        useSimpleStyle: function () {
            if (!this.options.useSimpleStyle) {
                this.eachLayer(function (l) {
                    if (l.options.icon !== undefined) {
                        l.setIcon(getIcon(l.feature.properties));
                    }
                });
                this.setStyle(style);
                this.options.useSimpleStyle = true;
            }
        },

        discardSimpleStyle: function () {
            if (this.options.useSimpleStyle) {
                this.eachLayer(function (l) {
                    if (l.options.icon !== undefined) {
                        l.setIcon(L.Icon.Default.prototype);
                    }
                });
                this.resetStyle();
                this.options.useSimpleStyle = false;
            }
        }
    });

    L.GeoJSON.addInitHook('_useSimpleStyle');

}());
