import e from 'express';

const app=e();



app.get('/',(req,res,next)=>{
    console.log('server has started i think');
    res.send('hi man, how are you?');
})
export default app;