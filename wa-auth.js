require("dotenv").config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// ** Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));
const corsConfig = {
    origin: 'https://localhost:3000',
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"]
};
app.use(cors(corsConfig));


// ???????????????????????????? User Quick Auth Section ????????????????????????????????


app.get('/', (req, res) => {
    console.log("Client Session: ", req.sessionID);
    console.log("Client Session: ", req.session);
    console.log("Client Session: ", req.cookies);
    res.json({
        msg: "goby.in - WA Auth"
    })
});


// const client = new Client();
// client.on('qr', qr => {
//     qrcode.generate(qr, { small: true });
// });
// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.initialize();


// client.on('message', message => {
//     console.log(message.body);
// });
// client.on('message', message => {
//     console.log(message.body);
//     if (message.body === '!ping') {
//         message.reply('pong');
//     }
// });


const options = {
    key: fs.readFileSync('./.cert/key.pem'),
    cert: fs.readFileSync('./.cert/cert.pem')
};

https.createServer(options, app)
    .listen(8081, function() {
        console.log('Server ON @ 8081');
    });



// ?????????????????????????????????????????????????????????????????????????????????????