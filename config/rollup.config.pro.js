/*
 * @Author: wufan
 * @Date: 2021-03-03 16:03:32
 * @LastEditors: wufan
 * @LastEditTime: 2021-03-03 16:08:40
 * @FilePath: /cypress-example-recipes/Users/wxy/codeWorks/demoPros/mwDB/melody-core-utils/config/rollup.config.pro.js
 * @Description: update here
 */
import path from 'path';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const getPath = _path => path.resolve(__dirname, _path);
let outModuleType='umd';
const extensions = ['js', 'ts'];

try {
    outModuleType = process.argv[process.argv.length-1].replace('--','');
} catch (error) {
    outModuleType = 'umd';
}


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
            tsPlugin,
            terser(),
        ],
        // 指出应将哪些模块视为外部模块
        external: ['react']
    }
}

function createOutOoptions(){
    let format = 'umd';
    if(outModuleType === 'cjs') {
        format = 'cjs';
    }
    return {
        file: 'dist/main.js',
        format
    };
}


const devConfig = (function (inputOptions, outOptions){
    return {
        ...inputOptions,
        output: outOptions
    };
})(createInputOptions(), createOutOoptions())

export default devConfig;