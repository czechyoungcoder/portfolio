const express = require('express'),
      nodemailer = require("nodemailer"),
      multiparty = require("multiparty"),
      cookieParser = require('cookie-parser'),
      smws = require("smws"),
      app = express();

require("dotenv").config();

app.set('view engine', 'eta');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// NODEMAILER
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to receive mail requests");
  }
});


// SMWS CONFIG
smws.config({
  languages: ['cs','en'],
  defaultLang: 'en'
});

app.post('/:lang/language', (req,res) => {
  smws.switcher(req,res);
});

app.get('/', (req, res) => {
  smws.run(req, res, {
      page: 'index'
  });
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, (err, fields) => {
    Object.keys(fields).forEach(property => {
      data[property] = fields[property].toString();
    });

    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

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

app.get('/:lang', function (req, res) {
  smws.run(req, res, {
      page: 'index'
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});

