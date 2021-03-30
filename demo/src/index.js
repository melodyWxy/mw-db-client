/*
 * @Author: 六弦(melodyWxy)
 * @Date: 2021-03-06 01:26:10
 * @LastEditors: 六弦(melodyWxy)
 * @LastEditTime: 2021-03-09 23:08:15
 * @FilePath: /cypress-example-recipes/Users/wxy/codeWorks/demoPros/mwDB/melody-core-utils/demo/src/index.js
 * @Description: update here
 */
import MWClientDB from './../../src/index.ts';

const db = new MWClientDB({
    dbName: '测试db'
});

db.setItem('测试表', {
    a: 1,
    b: 2
})
console.log('实例：', db);