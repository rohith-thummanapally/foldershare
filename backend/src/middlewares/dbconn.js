import mysql from 'mysql2/promise';

const db=await mysql.createConnection({
    'host':'localhost',
    'user':'root',
    'password':'rootpass',
    'database':'foldershare',
    'waitForConnections': true,
    'port':3307
});


/*db.connect(err=>{
    if(err)
    {
        console.log('Database connection failed, please try again later');
    }
    else
    {
        console.log('Database connection is successfull.');
    }
});*/

export default db;