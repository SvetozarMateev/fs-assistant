import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: './src/export.ts',
    output: {
        file: './dist/index.js',
        format: 'cjs',
        name: "assistant",
        sourcemap: true
    },
    plugins: [
        typescript({
            typescript: require('typescript'),
        }),
        terser({
            output: {
                comments: false
            },
        }),
        commonjs(),
        resolve({
            mainFields: ['module', 'main']
        }),
    ],
};