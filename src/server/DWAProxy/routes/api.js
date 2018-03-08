var express = require('express');
var router = express.Router();
var _ = require('underscore');
var superagent = require('superagent');
var storage = require('node-localstorage').LocalStorage;
var app = require('../app');

// API to Digital Workplace Advanced

var config_timeout = 10000;
var agent = superagent.agent();             //IMPORTANT agent object will remember the cookies between requests.
var localStorage = new storage('./config');

var callAPIPost = function(url,values,next) {
  agent.post(url)
    .type('application/json')
    .timeout(config_timeout)                                                // 10s timeout
//    .set('Content-Type', 'application/json')
    .set('default-bundle-scope', 'myit-sb')
    .set('X-Requested-By', 'DWAProxy')
    .send(values)
    .end(function(e,response){
      next(e,response);
    });
};

var callAPIGet = function(url, next) {
  agent.get(url)
    .type('application/json')
    .timeout(config_timeout)
//    .set('Content-Type', 'application/json')
    .set('default-bundle-scope', 'myit-sb')
    .set('X-Requested-By', 'DWAProxy')
    .end(function(e, response){
      next(e, response);
    });
};

var callAPIGetImage = function(url, next) {
  agent.get(url)
    .type('application/octet-stream')
    .timeout(config_timeout)
    //    .set('Content-Type', 'application/json')
    .set('default-bundle-scope', 'myit-sb')
    .set('X-Requested-By', 'DWAProxy')
    .set('Content-Disposition', 'Attachment')
    .end(function(e, response){
      next(e, response);
    });
};


//------------------------------------------------------

/* GET API version. */
router.get('/version', function(req, res, next) {
  res.send('0.1');
  res.status(200);
  res.end();
//  next();
});

//------------------------------------------------------

router.get('/about', function(req, res, next) {
  res.send('DWAProxy (C)2018 TSODev');
  res.status(200);
  res.end();
//  next();
});

//------------------------------------------------------

router.post('/config', function(req, res, next) {

  var connection = {
    protocol: '',
    port: '',
    server: '',
    user: '',
    pwd: ''
  };

  connection.protocol = req.body.protocol;
  connection.port = req.body.port;
  connection.server = req.body.server;
  connection.user = req.body.adminuser;
  connection.pwd = req.body.adminpwd;

  var config_error = false;
  if (!connection.protocol) { connection.protocol = 'http'};
  if (!connection.port) { connection.port = '80'};
  if (!connection.server) { config_error = true };
  if (!connection.user) { config_error = true};

  if (config_error) {
    res.send("Invalid configuration, please verify server and adminuser information");
    res.status(500);
    res.end();
  }
  else
    {
    // store connection info
    console.log('Connection Info : ', connection);
    var urlbase = connection.protocol + '//' + connection.server + ':' + connection.port;
    var url = urlbase + '/api/myit-sb/users/login';
    var values = {
      id: connection.user,
      password: connection.pwd
    };
  console.log("Accessing : ", url);
    callAPIPost(url,values, function(e, response){
      if (e === null){
        if (response.status === 200){
          // console.log("text : " , response.text);
          // console.log("Headers : ", response.headers);
          // Save the connection Info
          localStorage.setItem('urlbase', urlbase);
          res.set(response.headers);
          res.send(response.text);
          res.status(response.status);
          res.end()
        }
      }
      else {
        res.send(e.Error);
        res.status(500);
        res.end()
      }
    } )
  }
});

//------------------------------------------------------

router.get('/categories', function(req, res, next){
  console.log("Get Categories");

  const url = localStorage.getItem('urlbase') + '/api/myit-sb/categories';
  callAPIGet(url, function(e, response){
    if (e === null){
      if (response.status === 200){
        res.set(response.headers);
        res.send(response.text);
        res.status(response.status);
        res.end();
      }
      else {
        console.log(e);
        res.send(e.Error);
        res.status(500);
        res.end()
      }
    }
  })
});

router.get('/categories/:Id', function(req, res, next) {
  const id = req.params.Id;

  console.log("Get Child Categories - id : ", id);

  const url = localStorage.getItem('urlbase') + '/api/myit-sb/categories/' + id + '/categories';
  console.log(url);
  callAPIGet(url, function (e, response) {
    if (e === null) {
      if (response.status === 200) {
        console.log(response.text);
        res.set(response.headers);
        res.send(response.text);
        res.status(response.status);
        res.end();
      }
      else {
        console.log(e);
        res.send(e.Error);
        res.status(500);
        res.end()
      }
    }
  })
});

//-------------------------------------------------------

router.post('/services', function(req, res, next) {
  console.log("Get Service Catalog");
  const url = localStorage.getItem('urlbase') + '/api/myit-sb/services/search';
  console.log(url);
  const body = req.body;
  console.log('body : ', body);
  callAPIPost(url, body, function(e,response){
    if (e === null){
      if (response.status === 200){
        console.log(response.text);
        res.set(response.headers);
        res.send(response.text);
        res.status(response.status);
        res.end();
      }
    } else {
      console.log(e);
      res.send(e.Error);
      res.status(500);
      res.end()
    }
  })
});

//-- should not ne use (not necessary - can be handle by generic call with adequate body)
router.post('/services/:CategoryId', function(req, res, next) {
  console.log("Get Service Catalog by CategoryId");
  const url = localStorage.getItem('urlbase') + '/api/myit-sb/services/search';
  const values = {
    categoryId: req.params.CategoryId
  };
  callAPIPost(url,values, function(e,response){
    if (e === null){
      if (response.status === 200){
        console.log(response.text);
        res.set(response.headers);
        res.send(response.text);
        res.status(response.status);
        res.end();
      }
    } else {
      console.log(e);
      res.send(e.Error);
      res.status(500);
      res.end()
    }
  })
});

router.get('/offer/:ServiceId', function(req, res, next) {
  serviceid = req.params.ServiceId;
  console.log("get ServiceOffering Info", serviceid);
  const url = localStorage.getItem('urlbase') + '/api/myit-sb/services/' + serviceid;
  callAPIGet(url, function(e,response){
    if (e === null){
      if (response.status === 200){
        console.log(response.text);
        res.set(response.headers);
        res.send(response.text);
        res.status(response.status);
        res.end();
      }
    } else {
      console.log(e);
      res.send(e.Error);
      res.status(500);
      res.end()
    }
  })
});


router.post('/icon', function(req, res, next){
  console.log("Get Icon Image");
  const url = localStorage.getItem('urlbase') + req.body.iconurl;
  console.log(url);
  callAPIGetImage(url, function(e,response){
    if (e === null){
      res.set(response.headers);
      res.send(response.text);
      res.status(response.status);
      res.end();
    } else {
      console.log(e);
      res.send(e.Error);
      res.status(500);
      res.end()
    }
  })
})



module.exports = router;
