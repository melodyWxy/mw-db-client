/*
 * @Author: wufan
 * @Date: 2021-03-03 16:03:32
 * @LastEditors: wufan
 * @LastEditTime: 2021-03-03 16:58:05
 * @FilePath: /cypress-example-recipes/Users/wxy/codeWorks/demoPros/mwDB/melody-core-utils/src/index.ts
 * @Description: update here
 */
import { DBInitProps } from './type';


class MWIndexDB{
    public props:DBInitProps;
    public currentResult: Record<any, any>;
    public editorResult: Record<any, any>;
    public dbSingle: Record<any, any>;
    constructor(props: DBInitProps){
      this.props = props;
      this.init();
    }
    static recoveryDeal = () => {
        if(!window.indexedDB){
            console.error('当前浏览器不支持IndexDB储存方案');
            throw new Error('当前浏览器不支持IndexDB储存方案');
        }
    }
    private init = () => {
      MWIndexDB.recoveryDeal();
      // connect
      this.connectDB();
    }
    private connectDB = () => {
      const { dbName, version = 1} = this.props;
      this.currentResult = window.indexedDB.open(dbName, version);
      this.currentResult.onsuccess = this.openSuccessCallback;
      this.currentResult.onerror= this.openErrorCallback;
      this.currentResult.onupgradeneeded = this.openUpgradeneeded;
    }
    private openSuccessCallback = () => {
      this.dbSingle = this.currentResult.result;
      console.info(`
        ----数据库打开成功----
        db_name:${this.props.dbName}
        db_version: ${this.props.version}
      `);
    }
    private openErrorCallback = (event) => {
      console.error('数据库打开失败，详细内容如下：');
      console.error(event);
    }
    private openUpgradeneeded = (event) => {
      console.info('db_version更新: ${}');
      // 如果升级还是能拿到实例
      this.dbSingle = event.target.result;
      // createTable(db);
    }
    setItem = (tableName: string, setItemValue: Record<any, any>) => {
        return new Promise((resolve, reject)=>{
            this.editorResult = this.dbSingle.transaction([this.props.dbName], 'readwrite')
                .objectStore(tableName)
                .add(setItemValue);

            this.editorResult.onsuccess = function (event) {
                console.info(`----数据写入成功----`);
                resolve(event);
            };
            this.editorResult.onerror = function (event) {
                console.error('----数据写入失败----');
                console.error(event);
                reject(event)
            }
        })
    }
  }