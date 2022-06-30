const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser');
const prompt = require('prompt-sync')(); 
const fs = require('fs'); 
const axios = require('axios'); 


const app = express(); 


const IP_ADDR = "http://192.168.1.130:1234"; 

 let PASS; 


app.use(bodyParser.json()); 
app.use(cors()); 


fs.readFile("AUTH.txt", 'ascii', testCallback); 




 


app.get('/',  (req, res) =>{
    res.json("hello world"); 
});








app.post('/testhook', (req, res) =>{
    
    console.log(req.body); 
});






app.listen(8888, () =>{
    console.log("Listening on http://localhost:8888"); 
}); 


 



function testCallback(err, data){
    PASS = data; 

    let messageToSend = prompt("What do you want to send  "); 


    const dataToSend = {
        "chatGuid": "iMessage;-;+6591730434", 
        "tempGuid": "dgafeadfd", 
        "message": `${messageToSend}`,
    };

    let config = {
        method: 'post',
        url: `${IP_ADDR}/api/v1/message/text?password=${PASS}`,
        headers: {},
        data: dataToSend
    }; 
    

  //  console.log(dataToSend); 

   axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function(error){
        console.log(error); 
    })
}