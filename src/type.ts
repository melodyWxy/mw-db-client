/*
 * @Author: wufan
 * @Date: 2021-03-03 16:10:42
 * @LastEditors: 六弦(melodyWxy)
 * @LastEditTime: 2021-03-10 00:16:05
 * @FilePath: /cypress-example-recipes/Users/wxy/codeWorks/demoPros/mwDB/melody-core-utils/src/type.ts
 * @Description: update here
 */


export enum EditorType{
    setItem,
    getItem,
    getAll
}
 
export interface  DBInitProps {
    dbName: string;
    version?: number;
}

export interface SetItemEditor {
    editorType: EditorType.setItem;
    tableName: string;
    setItemValue: Record<any, any>;
}  


// export interface SetItemEditor {
//     editorType: EditorType.setItem;
//     tableName: string;
//     setItemValue: Record<any, any>;
// }  

// export interface SetItemEditor {
//     editorType: EditorType.setItem;
//     tableName: string;
//     setItemValue: Record<any, any>;
// }  
