import db from "../../middlewares/dbconn.js";
export default class fileModel
{
    constructor()
    {

    }

    async addfile(name,fileurl,folderid)
    {
        try
        {
            console.log('in addFile model');
            let insquery="INSERT INTO files (folderid,filename,url,createdon) values (?,?,?,?)";
            let [res]=await db.query('INSERT INTO files (folderid,filename,url,createdon) values (?,?,?,?)',[folderid,name,fileurl,new Date()]);

            if(res.insertId)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async updatedetails(name,fileurl,folderid,fileid)
    {
        try
        {
            console.log('in update details model');
            let [res]=await db.query('update files set filename= ?, url= ? where id= ?',[name,fileurl,fileid]);
            console.log(res);
            if(!res.errno)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch(err)
        {
            console.log(err);
        }

    }

    async getFiles(folderid)
    {
        try
        {
            let [data]=await db.query("select * from files where folderid= ?",[folderid]);
            return data;
        }
        catch(err)
        {
            console.log(err);
        }
    }
}