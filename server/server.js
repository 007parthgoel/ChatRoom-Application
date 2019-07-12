const path=require('path');
const express=require('express');

const publicpath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
const app=express();

app.use(express.static(publicpath));

app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});
//console.log(__dirname+'/../public');
//console.log(publicpath);