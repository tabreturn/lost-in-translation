// blueDot by @jquery404, @tabreturn, @andre, @kun, @hiroshika
// app.js
const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

app.use('/images', express.static(__dirname + '/assets/gfx'))

//middlewares
app.use(express.static(__dirname));

//routes
app.get('/vr', (req, res) =>{
    res.sendFile(__dirname + '/main/index.html');
});
//app.get('/r', (req, res) =>{
//    res.sendFile(__dirname + '/main/real.html');
//});
//port 
// server = app.listen(process.env.PORT || 5000, function(){
//     console.log('listening on port ' + server.address().port)
// });

// https.createServer(options, function (req, res) {
//     //res.writeHead(200);
//     //res.end("hello world\n");
//     //res.sendFile(__dirname + '/main/index.html');
//   }).listen(8000);

https.createServer(options, app).listen(8000);
http.createServer(app).listen(8080);
