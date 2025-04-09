import e from "express";
import folderController from "./folder.controller";


let foldercontrollerobj=new folderController();
export const folderrouter=e.Router();


folderrouter.get('/',(req,res,next)=>{
    foldercontrollerobj.getfolders(req,res,next);
})

folderrouter.post('/',(req,res,next)=>{
    foldercontrollerobj.newfolder(req,res,next);
})