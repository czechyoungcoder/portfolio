const express = require('express'),
      nodemailer = require("nodemailer"),
      multiparty = require("multiparty"),
      cookieParser = require('cookie-parser'),
      smws = require("smws"),
      app = express();

require("dotenv").config();

app.set('view engine', 'Eta');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

app.post("/send", (req, res) => {
  //1.
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    //2. You can configure the object however you want
    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// SMWS CONFIG
smws.config({
  languages: ['cs','en'],
  defaultLang: 'en'
});

app.post('/:lang/language', (req,res)=>{
  smws.switcher(req,res);
});

app.get('/', function (req, res) {

  smws.run(req, res, {
      page: 'index'
  });
});

app.get('/:lang', function (req, res) {
  smws.run(req, res, {
      page: 'index'
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});

