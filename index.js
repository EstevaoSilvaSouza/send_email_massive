const express = require('express');
const body = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const porta = 80;

app.listen(porta, () => {
    console.log(`Servidor online http://localhost:${porta}/`);
})

app.use('/assets', express.static(path.join(__dirname, "assets")))
app.use(body.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
    console.log(`entrou na pagina index`)
})

app.post('/', (req, res) => {
    if (req.body.emails != null) {
        let email = [];
        email.push(req.body.emails.split(';'));
        console.log(email)
        email.length = 0;
        for (let dados of email) {
            enviar(dados);
        }
        res.sendFile(path.join(__dirname, 'index.html'));


    }
})

let enviar = (emails) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "teste.estevao.noreplay@gmail.com",
            pass: "123@qwer"
        },
        tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
        from: 'teste.estevao.noreplay@gmail.com',
        to: emails,
        subject: 'E-mail enviado usando Node!',
        text: 'Bem fácil, não? ;)'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);

        } else {
            console.log('Email enviado: ' + info.response);
        }
    });

}