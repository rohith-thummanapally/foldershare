import folderRepo from "./folder.repository.js";


export default class folderController
{
    constructor()
    {
        this.folderrepo=new folderRepo();
    }

    async getfolders(req,res,next)
    {
        try{
            let result=await this.folderrepo.getfolders();
            if(result)
            {
                return res.status(200).send({"msg":"Data fetched successfuly","data":result});
            }
            else
            {
                return res.status(401).send({"msg":"Something failed, please try again later"});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async newfolder(req,res,next)
    {
        console.log('in new folder repo');
        console.log(req.body);
        console.log(req.files);
        try
        {
            let {name}=req.body;
            let foldercreated=await this.folderrepo.createfolder(name);
            if(foldercreated)
            {
                return res.status(200).send({"msg":"Folder Created Successfullt"})
            }
            else
            {
                return res.status(401).send({"msg":"something went wrong, please try later"});
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }   
}