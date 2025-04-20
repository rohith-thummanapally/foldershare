import fileModel from "./file.model.js";


export default class fileController
{
    constructor()
    {
        this.filemodelobj=new fileModel();
    }

    async addfile(req,res,next)
    {
        try{
            console.log('in add file controller');
            console.log(req.body);
            let {name,fileurl,folderid}=req.body;
            let fileadded=await this.filemodelobj.addfile(name,fileurl,folderid);
            if(fileadded)
            {
                return res.status(200).send({"msg":"File Added Successfully"});
            }
            else
            {
                return res.status(500).send({"msg":"Something Failed , please try again later"});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async updatefile(req,res,next)
    {
        try
        {
            let {name,fileurl,folderid,fileid}=req.body;
            let fileupdated=this.filemodelobj.updatedetails(name,fileurl,folderid,fileid);
            if(fileupdated)
            {
                return res.status(200).send({"msg":"File Updated Successfully"});
            }
            else
            {
                return res.status(500).send({"msg":"Something Failed , please try again later"});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async getfiles(req,res,next)
    {
        try
        {
            let folderid=req.params.id;
            console.log(folderid);
            let files=await this.filemodelobj.getFiles(folderid);
            if(files)
            {
                return res.status(200).send({"msg":"files Fecthed Successfully",data:files})
            }
            else
            {
                return res.status(400).send({"msg":"Something went wrong , please try agian later"});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async deleteFile(req,res,next)
    {   
        try{
            console.log('in delete file controller');
            console.log(req.body);
            let fileid=req.body.fileid;
            let file=await this.filemodelobj.deleteFile(fileid);
            if(file)
            {
                return res.status(200).send({"msg":'file has been deleted Successfully'});
            }
            else
            {
                return res.status(400).send({"msg":"something Failed please try again Later"});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }
}