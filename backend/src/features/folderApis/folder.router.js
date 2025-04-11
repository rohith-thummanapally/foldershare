import e from "express";
import folderController from "./folder.controller.js";
import {uploadFile} from "../../middlewares/fileupload.js";


const foldercontrollerobj=new folderController();
export const folderrouter=e.Router();


folderrouter.get('/',(req,res,next)=>{
    foldercontrollerobj.getfolders(req,res,next);
})

folderrouter.post('/addfolder',uploadFile.array('foldericon') ,(req,res,next)=>{
    foldercontrollerobj.newfolder(req,res,next);
})