# leaflet-simplestyle
Extends L.geoJSON to support the [simplestyle](https://github.com/mapbox/simplestyle-spec) spec. 

### Installing
`npm install leaflet-simplestyle`

### Usage
**Step 1.** Include the required js in your document 

```
    require('leaflet-simplestyle')
    // or
    <script src="leaflet-simplestyle/dist/leaflet-simplestyle.min.js"></script>
```

**Step 2.** Set the `useSimpleStyle` option to true when adding your geojson

````
    const point = {
      "type": "Feature",
      "properties": {
        "stroke-width": 10
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          67.592041,
          40.446947
        ]
      }
    }

    L.geoJSON(point, {
        useSimpleStyle: true
    }).addTo(map);
````

### Methods
- `useSimpleStyle()`, add's simple styling to a `L.geoJSON` object
- `discardSimpleStyle()`, Removes simple styling from a `L.geoJSON` object

For example
````
    const myLayer = L.geoJSON(point, {
        useSimpleStyle: false
    }).addTo(map);

    myLayer.useSimpleStyle()
````

### Acknowledgements
This borrows some of the code in the excellent [mapbox.js](https://github.com/mapbox/mapbox.js) library.