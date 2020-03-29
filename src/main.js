import simplestyle from './simplestyle';
import markerStyle from './marker';

L.GeoJSON.include({

    options: {
        useSimpleStyle: false,
        pointToLayer: markerStyle, // this can not be unset
    },

    _useSimpleStyle: function () {
        if (this.options.useSimpleStyle) {
            // this does not work
            // this.options.pointToLayer = markerStyle
            this.setStyle(simplestyle);
        }
    },

    useSimpleStyle: function () {
        if (!this.options.useSimpleStyle) {
            this.setStyle(simplestyle);
            this.options.useSimpleStyle = true;
        }
    },

    discardSimpleStyle: function (newStyle) {
        if (this.options.useSimpleStyle) {
            this.resetStyle();
            this.options.useSimpleStyle = false;
        }
    },

});

L.GeoJSON.addInitHook('_useSimpleStyle');
