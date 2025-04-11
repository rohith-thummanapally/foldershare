import db from "../../middlewares/dbconn.js";
export default class folderRepo
{
    constructor()
    {

    }

    async getfolders()
    {
        console.log('in get folders repo');
        let [res]=await db.query("select * from folders where 1");
        console.log('result of getfolders is');
        console.log(res);
        return res;
    }

    async createfolder(name)
    {
        let [res]= await db.query("Insert into folders (name,createdon ) values (?,?)",[name,new Date()]);
        console.log('result is');
        console.log(res);
        if(res.insertId)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}