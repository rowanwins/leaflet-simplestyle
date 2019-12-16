import { style } from './simplestyle'

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
           this.options.useSimpleStyle = true
       }
    },

    discardSimpleStyle: function (newStyle) {
       if (this.options.useSimpleStyle) {
           this.resetStyle();
           this.options.useSimpleStyle = false
       }
    }
})

L.GeoJSON.addInitHook('_useSimpleStyle')
