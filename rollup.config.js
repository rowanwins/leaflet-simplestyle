import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const output = (outputName, plugins = []) => ({
    input: './src/main.js',
    output: {
        name: 'leafletSimpleStyle',
        file: outputName,
        format: 'iife'
    },
    plugins: [
        ...plugins,
        resolve(),
        commonjs(
            { include: 'node_modules/**' }
        )
    ]
});

export default [
    output('./dist/leaflet-simplestyle.js'),
    output('./dist/leaflet-simplestyle.min.js', [terser()])
];
