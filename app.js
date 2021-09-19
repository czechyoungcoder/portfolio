const express = require('express'),
      cookieParser = require('cookie-parser'),
      smws = require("smws"),
      app = express();

app.set('view engine', 'Eta');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


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

