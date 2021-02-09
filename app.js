// blueDot by @jquery404, @tabreturn, @andre, @kun, @hiroshika
// app.js

const express = require('express');
const app = express();
let randomColor = require('randomcolor');
const uuid = require('uuid');

//middlewares
app.use(express.static(__dirname));

//routes
app.get('/vr', (req, res) =>{
    res.sendFile(__dirname + '/main/index.html');
});
app.get('/r', (req, res) =>{
    res.sendFile(__dirname + '/main/real.html');
});
//port 
server = app.listen(process.env.PORT || 5000, function(){
    console.log('listening on port ' + server.address().port)
});
