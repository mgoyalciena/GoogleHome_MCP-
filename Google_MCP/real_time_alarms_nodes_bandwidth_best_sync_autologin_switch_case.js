var request = require("request");
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const https = require('https');
var fs = require('fs');
var http = require("https");



//GET TOKEN
var readSource = 'C:/input.txt';
var options = { method: 'POST',
  url: 'https://10.41.74.70/tron/api/v1/tokens',
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form: { username: 'admin', password: 'adminpw', tenant: 'master' } };


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  var price = JSON.parse(body);

  

  let token = price.token;

  let auth_string = 'Bearer ' + token;

  fs.writeFile('C:/input.txt', auth_string, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;


    // success case, the file was saved
    console.log('Token saved!');

    console.log('token from file ' + auth_string);

});
});

setTimeout(function afterTwoSeconds() {
  var token_new = fs.readFileSync('C:/input.txt', 'utf8');
    console.log('new token ' + token_new); 
  
},2000)

    

app.post('/webhook', (req, res1) => {

var token_new = fs.readFileSync('C:/input.txt', 'utf8'); 
  

console.log(req.body);
  console.log('user asking for  ' + req.body.result.parameters["comment"]);
  console.log('user asking for  ' + req.body.result.parameters["given_name"]);

  var comment = req.body.result.parameters["comment"]
  var given_name = req.body.result.parameters["given_name"]
 

switch(comment){
  case 'no':
  {

res1.status(200).json({

         speech: 'Ok,thank you for using MCP Chatter.',
         
        });

  }
  break;

}


  if (given_name !== undefined){
   
    res1.status(200).json({

         speech: 'Hello '+ given_name + ' Welcome to MCP Chatter,what can I do for you today',
         
        });
  }

  if ((comment == 'bandwidth2')){
  


//For A-END CIR
var options1 = { method: 'POST',
  url: 'https://10.41.74.70/configmgmt/api/v1/jobs',
  headers: 
   { 
     'cache-control': 'no-cache',
     authorization: token_new,
     'content-type': 'application/json' },
  body: 
   { data: 
      { type: 'jobs',
        attributes: 
         { maxConnections: 10,
           scheduleTime: '',
           scripts: 
            [ { scriptName: 'cliCutThrough',
                inputs: 
                 [ { commands: 
                      [ 'traffic-profiling standard-profile set port 2 profile BP_PROFILE_1 cir 200000 vs evpl1\n',
                        'con sa\n' ] } ] } ] },
        relationships: 
         { networkConstructs: 
            { data: 
               [ { type: 'networkConstructs',
                   id: '544321e9-6478-4d8b-b7ca-2c1117624b68' } 
                   ] } 
                 } 
               },
     included: 
      [ { id: '544321e9-6478-4d8b-b7ca-2c1117624b68',
          type: 'networkElement',
          attributes: { ipAddress: '10.41.75.103' } 
        } 
        ] 
      },
  json: true };

  //For Z-END CIR


  var options2 = { method: 'POST',
  url: 'https://10.41.74.70/configmgmt/api/v1/jobs',
  headers: 
   { 
     'cache-control': 'no-cache',
     authorization: token_new,
     'content-type': 'application/json' },
     
  body: 
   { data: 
      { type: 'jobs',
        attributes: 
         { maxConnections: 10,
           scheduleTime: '',
           scripts: 
            [ { scriptName: 'cliCutThrough',
                inputs: 
                 [ { commands: 
                      [ 'traffic-profiling standard-profile set port 1 profile BP_PROFILE_1 cir 200000 vs evpl1\n',
                        'con sa\n' ] } ] } ] },
        relationships: 
         { networkConstructs: 
            { data: 
               [ { type: 'networkConstructs',
                   id: 'c03da4a8-0b30-4c84-82a6-a94fbcb82a5e' } 
                   ] } 
                 } 
               },
     included: 
      [ { id: 'c03da4a8-0b30-4c84-82a6-a94fbcb82a5e',
          type: 'networkElement',
          attributes: { ipAddress: '10.41.77.209' } 
        } 
        ] 
      },
  json: true };

  ///Trigger sync A-node


  var options1_1 = {
  "method": "PATCH",
  "hostname": "10.41.74.70",
  "port": null,
  "path": "/discovery/api/v4/managementSessions/544321e9-6478-4d8b-b7ca-2c1117624b68",
  "headers": {
    "content-type": "application/json",
    "authorization": "Bearer c9645ffceb721e8d7a75",
    "cache-control": "no-cache",
    
  }
};



  ///Trigger sync Z-node



  var options2_2 = {
  "method": "PATCH",
  "hostname": "10.41.74.70",
  "port": null,
  "path": "/discovery/api/v4/managementSessions/c03da4a8-0b30-4c84-82a6-a94fbcb82a5e",
  "headers": {
    "content-type": "application/json",
    "authorization": token_new,
    "cache-control": "no-cache",
    
  }
};



process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
request(options1, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


  request(options2, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


var req = http.request(options1_1, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ operations: [ { op: 'resync' } ] }));
req.end();


var req = http.request(options2_2, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ operations: [ { op: 'resync' } ] }));
req.end();




  res1.status(200).json({

         speech: 'ok,service Bandwidth has been changed to 200 MBPS and Nodal Sync has been triggered,is there anything else I can do',
         
        });

}

else if ((comment == 'bandwidth3')){

var ipAddress = '10.41.75.103';
//For A-END CIR
var options1 = { method: 'POST',
  url: 'https://10.41.74.70/configmgmt/api/v1/jobs',
  headers: 
   { 
     'cache-control': 'no-cache',
     authorization: token_new,
     'content-type': 'application/json' },
  body: 
   { data: 
      { type: 'jobs',
        attributes: 
         { maxConnections: 10,
           scheduleTime: '',
           scripts: 
            [ { scriptName: 'cliCutThrough',
                inputs: 
                 [ { commands: 
                      [ 'traffic-profiling standard-profile set port 2 profile BP_PROFILE_1 cir 300000 vs evpl1\n',
                        'con sa\n' ] } ] } ] },
        relationships: 
         { networkConstructs: 
            { data: 
               [ { type: 'networkConstructs',
                   id: '544321e9-6478-4d8b-b7ca-2c1117624b68' } 
                   ] } 
                 } 
               },
     included: 
      [ { id: '544321e9-6478-4d8b-b7ca-2c1117624b68',
          type: 'networkElement',
          attributes: { ipAddress: $[ipAddress] } 
        } 
        ] 
      },
  json: true };

  //For Z-END CIR


  var options2 = { method: 'POST',
  url: 'https://10.41.74.70/configmgmt/api/v1/jobs',
  headers: 
   { 
     'cache-control': 'no-cache',
     authorization: token_new,
     'content-type': 'application/json' },
  body: 
   { data: 
      { type: 'jobs',
        attributes: 
         { maxConnections: 10,
           scheduleTime: '',
           scripts: 
            [ { scriptName: 'cliCutThrough',
                inputs: 
                 [ { commands: 
                      [ 'traffic-profiling standard-profile set port 1 profile BP_PROFILE_1 cir 300000 vs evpl1\n',
                        'con sa\n' ] } ] } ] },
        relationships: 
         { networkConstructs: 
            { data: 
               [ { type: 'networkConstructs',
                   id: 'c03da4a8-0b30-4c84-82a6-a94fbcb82a5e' } 
                   ] } 
                 } 
               },
     included: 
      [ { id: 'c03da4a8-0b30-4c84-82a6-a94fbcb82a5e',
          type: 'networkElement',
          attributes: { ipAddress: '10.41.77.209' } 
        } 
        ] 
      },
  json: true };

 ///Trigger sync A-node


  var options1_1 = {
  "method": "PATCH",
  "hostname": "10.41.74.70",
  "port": null,
  "path": "/discovery/api/v4/managementSessions/544321e9-6478-4d8b-b7ca-2c1117624b68",
  "headers": {
    "content-type": "application/json",
    "authorization": token_new,
    "cache-control": "no-cache",
    
  }
};



  ///Trigger sync Z-node



  var options2_2 = {
  "method": "PATCH",
  "hostname": "10.41.74.70",
  "port": null,
  "path": "/discovery/api/v4/managementSessions/c03da4a8-0b30-4c84-82a6-a94fbcb82a5e",
  "headers": {
    "content-type": "application/json",
    "authorization": token_new,
    "cache-control": "no-cache",
    
  }
};





process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
request(options1, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

request(options2, function (error, response, body) {
  if (error) throw new Error(error);

var req = http.request(options1_1, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ operations: [ { op: 'resync' } ] }));
req.end();


var req = http.request(options2_2, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ operations: [ { op: 'resync' } ] }));
req.end();



  console.log(body);
  
res1.status(200).json({

         speech: 'Ok,service Bandwidth has been changed to 300 MBPS and Nodal Sync has been triggered,is there anything else I can do',
         
        });
  
});

}

var token_new = fs.readFileSync('C:/input.txt', 'utf8');
   
if ((comment == 'alarms')){

console.log(token_new);

var options ={
      host: '10.41.74.70',
      path: '/nsa/api/v1/alarms/filter/activeAlarms?offset=0&pageSize=500',
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': token_new,
    }
        
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var req = https.request(options, function(res){
    var body = '';
    res.on('data', function(chunk){
        body+=chunk;
    });


res.on('end', function(){
    var price = JSON.parse(body);

    console.log(price.meta.total);


    res1.status(200).json({

          speech: 'Ok,there are ' + price.meta.total + ' alarms on the MCP Server,is there anything else I can do',
          
        });


 
});
});



req.end();

}

 
    else if ((comment == 'nodes')){

var options ={
      host: '10.41.74.70',
      path: '/discovery/api/v4/managementSessions?limit=20',
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': token_new,
    }
        
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var req = https.request(options, function(res){
    var body = '';
    res.on('data', function(chunk){
        body+=chunk;
    });


res.on('end', function(){
    var price = JSON.parse(body);

    console.log(price.meta.total);

    res1.status(200).json({

          speech: 'Ok,there are ' + price.meta.total + ' nodes on the MCP Server,is there anything else I can do',
          
        });

    

});
});



req.end();

}



//else 
//
 //res1.status(200).json({




    //speech: 'there are alarms on the system',
        //  speech: 'Nothing matching ' + comment + ' found on the server,please try again,Thank You',
          //displayText: "Thank you for the feedback",
          //source: 'Hotel Feedback System'
       // });

//}



  

});



  app.listen(5000);
console.log('Running on port 5000...');










