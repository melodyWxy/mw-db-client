import path from 'path';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import livereload from 'rollup-plugin-livereload';
import ts from 'rollup-plugin-typescript2';

const getPath = _path => path.resolve(__dirname, _path);

const extensions = ['.js', '.ts', '.tsx'];

// ts
const tsPlugin = ts({
  tsconfig: getPath('../tsconfig.json'), // 导入本地ts配置
  extensions
})


function createInputOptions(){
    return {
        input: 'src/index.ts',
        plugins:[ 
            json(), 
            resolve({
                extensions,
                // 将自定义选项传递给解析插件
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),
            commonjs(),
            babel({
                exclude: 'node_modules/**', // 只编译我们的源代码
                runtimeHelpers: true
            }),
            livereload(),
            tsPlugin
        ],
        // 指出应将哪些模块视为外部模块
        external: ['react']
    }
}

function createOutOoptions(){
    return [{
        file: 'dist/main.js',
        format: 'cjs'
    }];
}


const devConfig = (function (inputOptions, outOptions){
    return {
        ...inputOptions,
        output: outOptions
    };
})(createInputOptions(), createOutOoptions())

export default devConfig;