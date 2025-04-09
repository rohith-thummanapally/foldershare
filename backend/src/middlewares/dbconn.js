import mysql from 'mysql2';

const db=mysql.createConnection({
    'host':'localhost',
    'user':'root',
    'password':'',
    'database':'foldershare'
});


db.connect(err=>{
    if(err)
    {
        console.log('Database connection failed, please try again later');
    }
    else
    {
        console.log('Database connection is successfull.');
    }
});

export default db;