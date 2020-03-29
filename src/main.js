import {style, getIcon} from './simplestyle'

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
                    l.setIcon(getIcon(l.feature.properties))
                }
            })
            this.setStyle(style);
            this.options.useSimpleStyle = true
        }
    },

    discardSimpleStyle: function () {
        if (this.options.useSimpleStyle) {
            this.eachLayer(function (l) {
                if (l.options.icon !== undefined) {
                    l.setIcon(L.Icon.Default.prototype)
                }
            })
            this.resetStyle();
            this.options.useSimpleStyle = false
        }
    }
})

L.GeoJSON.addInitHook('_useSimpleStyle')
