# leaflet-simplestyle
Extends [`L.geoJSON`](https://leafletjs.com/reference-1.3.4.html#geojson) to support the [simplestyle](https://github.com/mapbox/simplestyle-spec) spec. 

[Check out the demo](https://rowanwins.github.io/leaflet-simplestyle/example/basic.html)

### Installing
````
npm install leaflet-simplestyle
````

### Usage
**Step 1.** Include the library after you've included leafletjs.

```
    require('leaflet-simplestyle')
    // or
    <script src="leaflet-simplestyle/dist/leaflet-simplestyle.min.js"></script>
    // or via CDN
    <script src="https://unpkg.com/leaflet-simplestyle"></script>
```

**Step 2.** Set the `useSimpleStyle` option to `true` when adding your [`L.geoJSON`](https://leafletjs.com/reference-1.3.4.html#geojson) layer. 

You can also chose whether to support the [Maki Icon Library](https://github.com/mapbox/maki) using the `useMakiMarkers` property, this enables support for the `marker-symbol` property, however it does require calling the Mapbox API. If `useMakiMarkers=false` an inline SVG icon is still available which adjusts size and color.

````
    const rect = {
      "type": "Feature",
      "properties": {
        "fill": "yellow"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              10.45007,
              -10.359502
            ],
            ...
            [
              10.45007,
              -10.359502
            ]
          ]
        ]
      }
    },

    L.geoJSON(rect, {
        useSimpleStyle: true,
        useMakiMarkers: true
    }).addTo(map);
````

### Methods
- `useSimpleStyle()`, adds simple styling to a `L.geoJSON` object
- `discardSimpleStyle()`, Removes simple styling from a `L.geoJSON` object
- `toggleMakiMarkers()`, Toggles the maki marker styling on a `L.geoJSON` object

For example
````
    const myLayer = L.geoJSON(rect, {
        useSimpleStyle: false
    }).addTo(map);

    myLayer.useSimpleStyle()
````

### Acknowledgements
This borrows some of the code in the excellent [mapbox.js](https://github.com/mapbox/mapbox.js) library.
