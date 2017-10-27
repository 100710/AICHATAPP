
const express = require("express");
const app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
const path = require("path");
app.use(bodyParser()); 
app.use(bodyParser.json());
app.set("json spaces", 2);
app.set("json replacer", null);
app.set("views", "./public");
app.set("view engine", "jade");

var ibmdb = require('ibm_db');
//var ibmdb ='';

var db2 = {
        db: "BLUDB",
        hostname: "dashdb-entry-yp-dal09-08.services.dal.bluemix.net",
        port: 50000,
        username: "dash11029",
        password:   "x_B1ErG_4mnI"// "jMvGc@3~D0Mq"
     };
	 
var connString = "DRIVER={DB2};DATABASE=" + db2.db + ";UID=" + db2.username + ";PWD=" + db2.password + ";HOSTNAME=" + db2.hostname + ";port=" + db2.port;	 
	 
 


	 
	 
	 
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */

const Conversation = require("watson-developer-cloud/conversation/v1");

const classifier = new Conversation({
  username: "842921ad-edff-4f0e-a311-4a9a9e8c75d2",
  password: "DaZjpF4fUI7h",
  version: "v1",
  version_date: "2017-05-26"
});

// Render the index.html
app.get( "/", function( req, res ) {
  res.sendFile(path.join( __dirname, "public", "chatbox.html"));
  });
  
/**
 * Classify text
 */
    app.post("/classify", (req, res) => {  	
//req.body.responseContext.length = 0;

		console.log('calling classify');
	
    console.log("*************** Received 1 " + req.url);   
  	console.log('body: '+ req.body.title );
	console.log('body: '+ req.body.responseContext.length );
   	  
	 if(req.body.responseContext.length !=0 )
   {  
    console.log("*************** Received if");
    classifier.message( 
   {
    workspace_id: "b48969f8-dcd2-41f5-aea4-4f6f6587c7c9",
    input: {'text': req.body.title},
	context : req.body.responseContext
	},
    function (err, data) {
    if (err)
    {
    	console.log("*************** Received ERRRRRRRRRRRRRR");
      	return next(err);
  	}
    else
    	{
    		console.log("*************** Received 5");
    		
    		console.log("*************** Received 6");
    		console.log("*************** Received 6 "+ JSON.stringify(data));
    		
    		res.send(JSON.stringify(data));
    		
		}
	  }
  
	  );
   }
   
   else
   {
	   console.log("*************** Received else");
	     classifier.message( 
   {
    workspace_id: "b48969f8-dcd2-41f5-aea4-4f6f6587c7c9",
    input: {'text': req.body.title},
	},
    function (err, data) {
    if (err)
    {
    	console.log("*************** Received ERRRRRRRRRRRRRR");
      	return next(err);
  	}
    else
    	{
    		console.log("*************** Received 5");
    		
    		console.log("*************** Received 6");
    		console.log("*************** Received 6 "+ JSON.stringify(data));
    		
    		res.send(JSON.stringify(data));
    		
		}
	  }
  
	  );
   }
    });


	
	//Validating policy provided by user //
	//***********************************//
	
	app.post("/fetchactivities", (req, res1) => {
    	
    console.log("***************entering into fetch Activities");	
	//Opening the connection //	
		var response ="";
    ibmdb.open(connString, function(err, conn)
           {
        if(err) {

          	console.error("error: ", err.message);
          	console.log("*************** not open");
        } 
        else {
        	console.log("*************** Started");
			
		//Firing the query for fetching policy on basis of users input//
		 //   console.log("Policy No. by user" + req.body.policyNo);
            console.log("Query " + req.body.fetchQuery);
            conn.query(req.body.fetchQuery, function(err, activities, moreResultSets) {
            console.log("Activities list");
			console.log("----------\t\t--------------");
			console.log(activities.length);
			if(activities.length == 0)
				
				{
					 
					res1.send(activities);
					console.log('length is 0');
				}
else
				{
			   for (var i=0;i<activities.length;i++)
			{
				//console.log(activities[i].USECASE);
				console.log(activities[i].length)
			}
			
               console.log("sdfdfdf" + JSON.stringify(activities));
		       res1.send(activities);
			}
            



			});
             }	
		
       
        }); 
      
		
	});
	
	//.................

    	//Validating policy provided by user //
	//***********************************//
	
	app.post("/fetchphasedetail", (req, res1) => {
    	
    console.log("***************entering into fetch phase details");	
	//Opening the connection //	
		var response ="";
    ibmdb.open(connString, function(err, conn)
           {
        if(err) {

          	console.error("error: ", err.message);
          	console.log("*************** not open");
        } 
        else {
        	console.log("*************** Started");
			
		//Firing the query for fetching policy on basis of users input//
		 //   console.log("Policy No. by user" + req.body.policyNo);
            console.log("Query " + req.body.fetchQuery);
            conn.query(req.body.fetchQuery, function(err, activities, moreResultSets) {
            console.log("Activities phase list");
			console.log("----------\t\t--------------");

			   for (var i=0;i<activities.length;i++)
			{
				console.log(activities[i].PHASE_DETAIL);
				console.log(activities[i].length)
			}
			
               console.log("sdfdfdf" + JSON.stringify(activities));
		       res1.send(activities);
             });
             }	
       
        }); 
      
		
	});
	
	//Inserting Claim pon details provided by user //
	//***********************************//
	
	app.post("/updatestatus", (req, res1) => {
    	
    console.log("***************entering into update status");	
	//Opening the connection //	
		var response ="";
    ibmdb.open(connString, function(err, conn)
           {
        if(err) {
	
          	console.error("error: ", err.message);
          	console.log("*************** not open");
        } 
        else {
        	console.log("*************** Started11");
			
		    console.log("updateQuery " + req.body.fetchQuery);
            conn.query(req.body.fetchQuery, function(err, policies1, moreResultSets) {			
               if(err) {

          	console.error("error: ", err.message);
          	console.log("*************** not open"+err.message);
                         } 			
			else
			{
               console.log("Data has been updated");
			   z =[{'text':'ステータスの更新に成功しました。'}]
			   res1.send(z);
			}
		       
             });
			 
			   }	
       
        }); 
      
		
	});
	
app.use('/api/speech-to-text/', require('./stt-token.js'));
app.use('/api/text-to-speech/', require('./tts-token.js'));

module.exports = app;