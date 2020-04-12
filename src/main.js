import {style, getIcon} from './simplestyle'

L.GeoJSON.include({

    options: {
        useSimpleStyle: false,
        useMakiMarkers: false
    },

    _useSimpleStyle: function () {
        if (this.options.useSimpleStyle) this.useSimpleStyle();
    },

    toggleMakiMarkers: function () {
        this.options.useMakiMarkers = !this.options.useMakiMarkers
        this._useSimpleStyle()
    },

    useSimpleStyle: function () {
        this.options.useSimpleStyle = true
        const that = this
        this.eachLayer(function (l) {
            if ('icon' in l.options) {
                l.setIcon(getIcon(l.feature.properties, that.options.useMakiMarkers))
            }
        })
        this.setStyle(style);
    },

    discardSimpleStyle: function () {
        this.options.useSimpleStyle = false
        this.eachLayer(function (l) {
            if (l.options.icon !== undefined) {
                l.setIcon(L.Icon.Default.prototype)
            }
        })
        this.resetStyle();
    }
})

L.GeoJSON.addInitHook('_useSimpleStyle')
