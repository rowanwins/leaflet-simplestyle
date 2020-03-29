import {terser} from 'rollup-plugin-terser'

const output = (outputName, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'leafletSimpleStyle',
        file: outputName,
        format: 'iife'
    },
    plugins
})

export default [
    output('./dist/leaflet-simplestyle.js'),
    output('./dist/leaflet-simplestyle.min.js', [terser()])
]
