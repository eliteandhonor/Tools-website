import Dexie from '/vendor/cdn/dexie.mjs';
export const db=new Dexie('mtu');
db.version(1).stores({results:'++id,tool,input,output,ts'});
export function saveResult(tool,input,output){return db.results.add({tool,input,output,ts:Date.now()});}
export function getRecent(tool,limit=10){return db.results.where('tool').equals(tool).reverse().limit(limit).toArray();}
