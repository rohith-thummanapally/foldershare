import e from 'express';
import fileController from './file.controller.js';
export const fileRouter=e.Router();
import {uploadFile} from "../../middlewares/fileupload.js";
const fileControllerobj=new fileController();
fileRouter.post('/addfile',uploadFile.none(),(req,res,next)=>{
    fileControllerobj.addfile(req,res,next);
}); 


fileRouter.get('/:id',(req,res,next)=>{
    fileControllerobj.getfiles(req,res,next);
});


fileRouter.post('/updatefile',(req,res,next)=>{
    fileControllerobj.updatefile(req,res,next);
})

fileRouter.post('/deletefile',uploadFile.none(),(req,res,next)=>{
    fileControllerobj.deleteFile(req,res,next);
})

