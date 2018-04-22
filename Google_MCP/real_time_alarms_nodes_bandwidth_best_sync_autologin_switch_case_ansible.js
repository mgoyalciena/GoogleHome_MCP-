var request = require("request");
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const https = require('https');
var fs = require('fs');
var http = require("https");


//GET TOKEN ANSIBLE and SAVE in File//


//GET TOKEN MCP and SAVE in File//



////WAIT TIMER FOR ASYNC CALL MCP Token read/write//

//setTimeout(function afterTwoSeconds() {
 // var token_new = fs.readFileSync('C:/ans_token.txt', 'utf8');
 //   console.log('new ans token ' + token_new); 
 // var token_ans = fs.readFileSync('C:/mcp_token.txt', 'utf8');
  //  console.log('new mcp token ' + token_ans); 
//},2000)

    

app.post('/webhook', (req, res1) => {

//var token_new = fs.readFileSync('C:/input_mcp.txt', 'utf8'); 


  

console.log(req.body);
  console.log('user asking for  ' + req.body.result.parameters["comment"]);
  console.log('user asking for  ' + req.body.result.parameters["given_name"]);

  var comment = req.body.result.parameters["comment"]
  var given_name = req.body.result.parameters["given_name"]
 

//var token_ans = fs.readFileSync('C:/input_ans.txt', 'utf8'); 

//Given_name_is not present

if (given_name !== undefined){
   
    res1.status(200).json({

         speech: 'Hello '+ given_name + ' Welcome to MCP Chatter,what can I do for you today',
         
        });
  }


switch(comment)
{
  
//Login to MCP
case 'LOGIN_MCP':
{

var options = { method: 'POST',
  url: 'https://10.41.74.70/tron/api/v1/tokens',
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form: { username: 'admin', password: 'adminpw', tenant: 'master' } };


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

request(options, function (error, response, body2) {
  if (error) throw new Error(error);

  var token2 = JSON.parse(body2);

  let auth_string = 'Bearer ' + token2.token;

  fs.writeFile('C:/mcp_token.txt', auth_string, (err) => {  

    if (err) throw err;

    // success case, the file was saved
    
    console.log('Token_mcp saved is file as ' + auth_string);

    res1.status(200).json({

         speech: 'Login to MCP has been done and token has been saved to file,let me know what to do next' ,
         
        }); 


});
});


}
break;



//Login to ANSIBLE

case 'LOGIN_ANSIBLE':

{
//var request = require("request");

var options = { method: 'POST',
  url: 'https://10.41.74.249/api/v2/authtoken/',
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: { username: 'admin', password: 'Cdl1234!' },
  json: true };


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

request(options, function (error, response, body1) {
  if (error) throw new Error(error);

var token1='Token ' + body1.token;


  fs.writeFile('C:/ans_token.txt', token1, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;


    // success case, the file was saved
  

    console.log('Token_ans saved in file as ' + token1);

    res1.status(200).json({

         speech: 'Login to ANSIBLE has been done and token has been saved to file,let me what to do next' ,
         
        }); 



});
});

}
break;

///Anytime user says no,nope,nothing

case 'no':
  {

res1.status(200).json({

         speech: 'Ok,thank you for using MCP Chatter.',
         
        });
}

break;

////RUN Customer config thru Ansible

case 'bestel':
{

var token_ans = fs.readFileSync('C:/ans_token.txt', 'utf8');

var options_bestel = { method: 'POST',
  url: 'https://10.41.74.249/api/v2/job_templates/13/launch/',
  headers: 
   { 
     'cache-control': 'no-cache',
     authorization: token_ans ,
     'content-type': 'application/json' } };

request(options_bestel, function (error, response, body) {
  if (error) throw new Error(error);
var url_to_status = JSON.parse(body);

 fs.writeFile('C:/ans_job_id_url.txt', url_to_status.url, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;

    console.log('url_for_job_status saved in file as ' + url_to_status.url);

   res1.status(200).json({

         speech: 'Job has been executed,id is  ' + url_to_status.id +  ' and its status is ' + url_to_status.status ,
         
        }); 

});

});
}

break;


case 'mpls':

{


///RUN MPLS Config//

var token_ans = fs.readFileSync('C:/ans_token.txt', 'utf8');

var options_config = { method: 'POST',
  url: 'https://10.41.74.249/api/v2/job_templates/12/launch/',
  headers: 
   { 
     'cache-control': 'no-cache',
     authorization: token_ans ,
     'content-type': 'application/json' } };

request(options_config, function (error, response, body) {
  if (error) throw new Error(error);
var url_to_status = JSON.parse(body);

 fs.writeFile('C:/ans_job_id_url.txt', url_to_status.url, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;

    console.log('url_for_job_status saved in file as ' + url_to_status.url);

   res1.status(200).json({

         speech: 'Job has been executed,id is  ' + url_to_status.id +  ' and its status is ' + url_to_status.status ,
         
        }); 

});

});

}

break;


///RUN DEFAULT Config //

case 'default_config':

{

var token_ans = fs.readFileSync('C:/ans_token.txt', 'utf8');

var options_config = { method: 'POST',
  url: 'https://10.41.74.249/api/v2/job_templates/11/launch/',
  headers: 
   { 
     'cache-control': 'no-cache',
     authorization: token_ans ,
     'content-type': 'application/json' } };

request(options_config, function (error, response, body) {
  if (error) throw new Error(error);
var url_to_status = JSON.parse(body);

 fs.writeFile('C:/ans_job_id_url.txt', url_to_status.url, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;

    console.log('url_for_job_status saved in file as ' + url_to_status.url);

   res1.status(200).json({

         speech: 'Job has been executed,id is  ' + url_to_status.id +  ' and its status is ' + url_to_status.status ,
         
        }); 

});

});

}

break;

case 'Job_Status':

{

var url_job = fs.readFileSync('C:/ans_job_id_url.txt', 'utf8');

var token_ans = fs.readFileSync('C:/ans_token.txt', 'utf8');

var url='https://10.41.74.249'+url_job;
var options_job = { method: 'GET',
  url: url,
  headers: 
   { 
     'cache-control': 'no-cache',
     authorization: token_ans,
     'content-type': 'application/json' } };

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


request(options_job, function (error, response, body) {
  if (error) throw new Error(error);
var job_status = JSON.parse(body);
  console.log('Job as ' + url + ' is ' + job_status.status);

  res1.status(200).json({

         speech: 'Job has been executed,id is  ' + job_status.id +  ' and its status is ' + job_status.status,
         
        }); 
});





  }

  break;




case 'bandwidth2':

{

  //if ((comment == 'bandwidth2')){
  


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

} break;

case 'bandwidth3':

{

//else if ((comment == 'bandwidth3')){

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
break;


case 'alarms':
{
//if ((comment == 'alarms')){
	
var token_new = fs.readFileSync('C:/mcp_token.txt', 'utf8');

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
    var all_alarms = JSON.parse(body);

    console.log(all_alarms.meta.total);


    res1.status(200).json({

          speech: 'Ok,there are ' + all_alarms.meta.total + ' alarms on the MCP Server,is there anything else I can do',
          
        });


 
});
});



req.end();

}break;

case 'nodes':
{
   // else if ((comment == 'nodes')){
var token_new = fs.readFileSync('C:/mcp_token.txt', 'utf8');
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
    var all_nodes = JSON.parse(body);

    console.log(all_nodes.meta.total);

    res1.status(200).json({

          speech: 'Ok,there are ' + all_nodes.meta.total + ' nodes on the MCP Server,is there anything else I can do',
          
        });

    

});
});



req.end();

} break;


case 'Remote Port Unreachable':
case 'Link Down':
case 'CFM Fault Trap':
case 'EQPT_MISSING':
{
//if ((comment = 'Remote Port Unreachable'||'Link Down'||'CFM Fault Trap'||'EQPT_MISSING')){
var string_to_fetch= comment;

var i = 0, strLength = string_to_fetch.length;
 
for(i; i < strLength; i++) {
 
 string_to_fetch = string_to_fetch.replace(" ", "%20");
 
}
console.log(string_to_fetch);

var token_new = fs.readFileSync('C:/mcp_token.txt', 'utf8');

var url_to_fetch='/nsa/api/v2_0/alarms/filter/filteredAlarms?filter%5BcontextState%5D%5B%5D=ACTIVE&filter%5BnativeConditionType%5D%5B%5D='+string_to_fetch+'&offset=0&pageSize=500';

var options ={
      host: '10.41.74.70',
      path: url_to_fetch,
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
    var down_alarm = JSON.parse(body);

    console.log(down_alarm.meta['query-total']);

    var filtered_alarm= down_alarm.meta['query-total'];

    res1.status(200).json({

          speech: 'Ok,there are ' + filtered_alarm + ' ' + comment + ' alarms on the MCP Server,is there anything else I can do',
          
        });

    

});
});



req.end();

}break;
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










