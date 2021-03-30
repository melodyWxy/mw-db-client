/*
 * @Author: wufan
 * @Date: 2021-03-03 16:03:32
 * @LastEditors: 六弦(melodyWxy)
 * @LastEditTime: 2021-03-11 18:49:05
 * @FilePath: /cypress-example-recipes/Users/wxy/codeWorks/demoPros/mwDB/melody-core-utils/src/index.ts
 * @Description: update here
 */
import { DBInitProps, SetItemEditor, EditorType } from './type';


export default class MWIndexDB{
    public props:DBInitProps;
    public currentResult: IDBOpenDBRequest;
    public editorResult: IDBRequest<IDBValidKey>;
    public dbSingle: IDBDatabase;
    private editorList: (SetItemEditor)[]
    constructor(props: DBInitProps){
      this.props = props;
      if(!this.props.version && this.props.version!==0){
        this.props.version =1;
      } 
      this.editorList = [];
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
      this.props.version +=1 ; 
      const { dbName} = this.props;
      this.currentResult = window.indexedDB.open(dbName, this.props.version);
      this.currentResult.onsuccess = this.openSuccessCallback;
      this.currentResult.onerror= this.openErrorCallback;
      this.currentResult.onupgradeneeded = this.openUpgradeneeded;
    }
    private openSuccessCallback = () => {
      this.dbSingle = this.currentResult.result;
      console.log(this.dbSingle)
      console.info(`
        ----数据库打开成功----
        db_name:${this.props.dbName}
        db_version: ${this.props.version}
      `);
      // this.editorList.forEach((editorItem: SetItemEditor)=>{
      //   const { editorType } = editorItem;
      //   if(editorType === EditorType.setItem){
      //     console.log('set-do')
      //     return this.setItemDo(editorItem.tableName, editorItem.setItemValue);
      //   }
      // })
    }
    private openErrorCallback = (event) => {
      console.error('数据库打开失败，详细内容如下：');
      console.error(event);
    }

    private openUpgradeneeded = (event) => {
      console.info(`db_version更新: ${this.props.version}`);
      // 如果升级还是能拿到实例
      this.dbSingle = event.target.result;
      this.editorList.forEach((editorItem: SetItemEditor)=>{
        const { editorType } = editorItem;
        if(editorType === EditorType.setItem){
          console.log('set-do')
          return this.setItemDo(editorItem.tableName, editorItem.setItemValue);
        }
      })
    }

    public setItem = (tableName: string, setItemValue: Record<any, any>) => {
      this.editorList.push({
        editorType: EditorType.setItem,
        tableName,
        setItemValue
      })
      console.log('set-push');
    }

    // public getItem = (tableName: string, setItemValue: Record<any, any>) => {
    //   this.editorList.push({
    //     editorType: EditorType['setItem'],
    //     params: {
    //     }
    //   })
    // }

    public setItemDo = (tableName: string, setItemValue: Record<any, any>) => {
        return new Promise((resolve, reject)=>{
            console.dir(this.dbSingle, '--');
            this.editorResult  = this.dbSingle.createObjectStore(tableName).add(setItemValue);
            // .transaction([this.props.dbName], 'readwrite')
            //     .objectStore(tableName)
            //     .add(setItemValue);

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
    // public getItemDo = () => {
    //     console.log(this.editorResult);
    // }
  }