/* Declaration of global variables */
  var contentbox = "";

 var chatText="";
 var speechText="";
 var responseContext="";
 var claimPolicy ="";
 var VEHICLE_REGISTRATION_NO ="";
 var CLIENT_CONTACT_NUMBERS ="";
 var check_policy_flg="";
 var chkExitFlg =0;
 var chkResponseExtFlg = 0;
 var chatLang = "";
 var id ='usecases';
var dropDownFlag = 0;
var url1 ='http://localhost:6009/';

/*
  function usecaseSelect(selVal){
  $("#status_message").val(selVal);
  $("#send")[0].click();
}
*/

gettoken(function(post){   ///get the token
console.log('token is' , post);


 function usecaseSelect(){
var fld = document.getElementById('usecases' + dropDownFlag);
var values = [];
for (var i = 0; i < fld.options.length; i++) {
  if (fld.options[i].selected) {
    values.push(fld.options[i].value);
  }
}
$("#status_message").val(values);
dropDownFlag++;
$("#send")[0].click();
}


//Function to validate the policy number //

 function fetchBluemixResponse(chatText,call){
		         
         var data = {};
	     		
// Ajax call to bluemix service to send the text. Response is fetched and is shown in chat box by appeneding in the dialog box as HTML. //
         data.title = chatText;
		 data.responseContext = responseContext;

	//	 data.responseContext.length =0;

		 console.log('calling with chattext');	
		 console.log('lenth is' ,data.responseContext.length);	

 
        $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
	                     
        url: url1 + 'classify', 
        success: function(data) {
        console.log('success');
	    responseContext = data.context;

		

		var now = new Date(Date.now());
		var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();			
		//var policyNo = "" ;
	console.log('status is ' ,responseContext.status_flag);
	
//responseContext.unknown_flg = 0 ;
			//chkResponseExtFlg =0;

 if(responseContext.db_flag =='x2') //completed

{

console.log('in x2');
console.log();
 //startSpeaking(data.output.text[0]);
 passtoken(post , data.output.text[0]);

	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

var status= responseContext.status_flag;     //'開始した';  //started
console.log(status);
var flag = 'actualdate' ;// date for compare
fetchactivities(status,flag) ;
responseContext.db_flag ='' ;
//$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +"私はあなたを助けることができる他の何か？"+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");


}


else if(responseContext.dbflag_1 =='x1') //fetching detail from db

{
	var usecase_flag = responseContext.usecase_flag;//name of use case
	var phase_flag = responseContext.phase_flag;//design,development @PHASE_DETAIL
	

console.log(usecase_flag , phase_flag);
//startSpeaking(data.output.text[0]);
passtoken(post ,data.output.text[0] );

	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");


fetchphasedetail(usecase_flag , phase_flag) ;
responseContext.dbflag_1 ='' ;


}

else if(responseContext.dbflag_1 =='x3') //fetching detail from db

{
	var activity_flag = responseContext.activity_flag;//name of use case  //its comma separated value.
	var usecase_flag = responseContext.usecase_flag;//name of use case6
	var phase_flag = responseContext.phase_flag;//design,development @PHASE_DETAIL
	 console.log(activity_flag ,usecase_flag,phase_flag);

//startSpeaking(data.output.text[0]);
passtoken(post , data.output.text[0]);
	 	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	 fetchstatusdetail(activity_flag ,usecase_flag,phase_flag) ;

       responseContext.dbflag_1 ='' ;

	
	


}


 if(responseContext.db_flag =='x4') //to update the project scenario3 for usecase

{

console.log('in x4');
console.log();
 //startSpeaking(data.output.text[0]);
 passtoken(post , data.output.text[0]); //please wait!

	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

var usecase= responseContext.usecase_flag;     //usecase
console.log(status);
var flag = 'actualdate' ;// date for compare
fetchphases(usecase) ;
responseContext.db_flag_1 ='' ;
//$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +"私はあなたを助けることができる他の何か？"+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");


}

else
{

	passtoken(post , data.output.text[0]);
        
		$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	
}
	
		
		
        var d = $('.popup-messages');
        d.scrollTop(d.prop("scrollHeight"));	
	
        


		},
        error: function(error) {
            console.log("some error in fetching the notifications");
         }

    });
         
  }



////function --No change

 function commaSeparateNumber(val){
    while (/(\d+)(\d{1})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{1})/, '$1'+','+'$2');
    }
    return val;
  }




function xyz(text){


var text =text ;
console.log('funcation2 call');
console.log()
 var now = new Date(Date.now());
		  var formatted2 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-text' style='background-color:blanchedalmond'>" +text+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>"  +formatted2+ "</span></div></div>");


      var call =0;
	  fetchBluemixResponse(text,call) ;
  

  }


  function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


////function to fetch the list of activites based on completed/delay/progress
  function fetchactivities(status,flag){
	  console.log('in fetch activity fucntion') ;
	     	 var now = new Date(Date.now());
		 var formatted5 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		 var status = status;
		  var data ={}; 
		 console.log('started status field is' ,status);
        var FetchQuery = '';
	  

      if(status =='完了')  //complete
	    var FetchQuery ="SELECT CONCAT(CONCAT(USECASE,':') ,PHASE_DETAIL) USECASE FROM  MHPSJP4 where A_E_D is not null ";
		else if(status =='遅れている') //late
         var FetchQuery ="SELECT CONCAT(CONCAT(USECASE,':') ,PHASE_DETAIL) USECASE FROM  MHPSJP4 where A_E_D is  null  and sysdate>P_E_D";
        else    //進行中  in progress
         var FetchQuery ="SELECT CONCAT(CONCAT(USECASE,':') ,PHASE_DETAIL) USECASE FROM  MHPSJP4 where A_E_D is null and sysdate <=P_E_D and STATUS1 ='着手済' ";

        data.fetchQuery =FetchQuery;		 
			$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: url1 + 'fetchactivities',                      
    
      success: function(data) {

		  console.log('db call success');
		  console.log(data[0]);
		  var x ='<html><head><style> table, th, td { border: 1px solid black;}</style></head> <body><table>';
		  
		  for(var i=0;i<data.length ;i++)
		  {
			 x += '<tr><td style="width:50%">'+ data[i].USECASE + '</td></tr>' ;
			// console.log(x);
		  }
          x+='</table></body></html>';
		  console.log(x);
          

      	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ x +".</b>.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		 
		 //is there anything correct else I can help you
		 
		 //startSpeaking('他に知りたいことありますでしょうか');
		  passtoken(post, '他に知りたいことありますでしょうか');
		 
		 
	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'他に知りたいことありますでしょうか'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");




	
		  var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));	

		  
        }

    });
 }
 

 //


 ////

 ////function to fetch the list of activites based on completed/delay/progress
  function fetchstatusdetail(activity_flag ,usecase_flag,phase_flag)
  
  {
	  console.log('in fetch activity fucntion') ;
	     	 var now = new Date(Date.now());
		 var formatted5 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		 var activity_flag =activity_flag;
         var usecase_flag=usecase_flag;
         var phase_flag =phase_flag;
		  var data ={}; 
         var arr1 =activity_flag.split(",");  //split the multiple values which are seprated by ,

		 	if (arr1.length ==2)

              {
	
                console.log('length is 2 if');
	
                 var val1 = arr1[0];
	              var val2 = arr1[1];
	             console.log(val1 ,val2);
  var FetchQuery ="SELECT A_E_D ,SYSDATE C_D , P_E_D,P_S_D ,STATUS1 ,PHASE_DETAIL FROM  MHPSJP4 where PHASE ='"+phase_flag+ "'and USECASE ='" +usecase_flag +"'"  + " and (PHASE_DETAIL ='" +val1 +"' OR " + "PHASE_DETAIL ='" +val2 +"')" ;
}
else 

{

 var FetchQuery ="SELECT A_E_D ,SYSDATE C_D , P_E_D,P_S_D ,STATUS1,PHASE_DETAIL FROM  MHPSJP4 where PHASE ='"+phase_flag+ "'and USECASE ='" +usecase_flag +"' and PHASE_DETAIL ='" +activity_flag +"'" ;

}
	
		 console.log('started status field is' ,status);
        
	  
	

        data.fetchQuery =FetchQuery;		 
			$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: url1 + 'fetchactivities',                      
    
      success: function(data) {

		  console.log('db call success');
		  console.log(data[0]);
		  console.log(data[1]);
		  var z ='';

		  for (var i=0;i<data.length;i++)
		  {

		  console.log(data[i].A_E_D  ,'yyy');

		  var A_E_D =data[i].A_E_D;

		  if(A_E_D)
		  {

		  console.log('in aed');
		   A_E_D =new Date(data[i].A_E_D );
		  }

		  else
		  {
		   console.log('in else');
		  A_E_D ='';
		  }


          var P_E_D =new Date(data[i].P_E_D) ;
          
          var P_S_D =new Date(data[i].P_S_D);
          var status =data[i].STATUS1 ; //started 
          var currentdate =new Date(data[i].C_D) ;

		  console.log(P_S_D , currentdate);
		 var x ='';
		 
console.log(A_E_D  ,'yyy');
         //logic to check the status for an activity

         if(A_E_D)  //already completed

         {

             console.log('not null');
             if(P_E_D>=A_E_D)  //end date is  > =actual date  ====completed on time

       var x = '作業のステータス：遅れなく完了' //活動状況：時間通りに完了しました' 作業のステータス：遅れなく完了
       else

       var x =   '作業のステータス：完了済、遅れあり' //'活動ステータス：完了しましたが遅れました' //completed with delay
         }

         else    ///if actual date is null
         {
             if(status == '未着手')   //not started

             {

                 if(P_S_D>=currentdate)
                var x =   '作業のステータス：未着手'     //not started
                else
                var x =    '作業のステータス：未着手、遅れあり'    //delayed not started


             }
             

             else   //if status is started
             {
              if(P_E_D >=currentdate)   //started and not completed.. bcos p_e_D is far

          var x = '作業のステータス：進行中'  //アクティビティのステータス：進行中' in progress
          else 
          var x ='作業のステータス：進行中、遅れあり'  // progress with delay

             }


         }
		  
 z+= '<br>' + data[i].PHASE_DETAIL + '<br>'  + x;
 console.log(z);
		  }
		  console.log(z);

      	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ z +".</b>.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		 
		 //is there anything correct else I can help you
		 
		 //startSpeaking('他に知りたいことありますでしょうか');
		 passtoken(post , '他に知りたいことありますでしょうか');
		 
	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'他に知りたいことありますでしょうか'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");


		  var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));	

		  
        }

    });
 }

 ////


 ////function to fetch the list of activites based on completed/delay/progress
  function fetchphasedetail(u_flag,p_flag){
	  console.log('in fetch activity fucntion') ;
	     	 var now = new Date(Date.now());
		 var formatted5 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		 var status = status;
		  var data ={}; 
		 console.log('started status field is' ,status);
     
	 // var p_flag = '基本と詳細設計';
        p_flag =p_flag ;   //design/developement
	    var FetchQuery ="SELECT PHASE_DETAIL FROM  MHPSJP4 where USECASE = '" + u_flag +  "'and PHASE= '" + p_flag +"'" ;
		
        data.fetchQuery =FetchQuery;		 
			$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: url1 + 'fetchphasedetail',                      
    
      success: function(data) {

		  console.log('db call success 2');
		  console.log(data[0]);
		var x ='<html><head><style> table, th, td { border: 1px solid black;}</style></head> <body><table>';
		  /*
		  for(var i=0;i<data.length ;i++)
		  {
               x += '<tr><td style="width:50%">'+ data[i].PHASE_DETAIL + '</td></tr>' ;
			
			// console.log(x);
		  }
          x+='</table></body></html>';
		  console.log(x);
		  */
              // startSpeaking('以下は活動のリストです');
			  passtoken(post,'以下は活動のリストです'); 

		  	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ '以下は活動のリストです' +".</b></div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");

			  
		 // var x ="<select id='usecases' onchange='usecaseSelect(this.value)'>" + "<option value=''> SELECT</option>";
		 var x ="<select multiple id='usecases"+ dropDownFlag +"'>";
    for(var i=0;i<data.length ;i++)
    {
    x += "<option value='" + data[i].PHASE_DETAIL + "'>" + data[i].PHASE_DETAIL  + " </option>";
    }

 x+="</select>  <button id='usecases_btn' onclick='usecaseSelect()' type='submit'  title='Type and enter'  name='usercase_btn' value='Submit'>Send</button>";
		  
		  
		  
		
    console.log(x);
//	id ='xyz';


      	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ x +".</b></div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		 
		 //Which activity status you want?

		// startSpeaking('どの作業のステータスを知りたいでしょうか。');
		 passtoken(post , 'どの作業のステータスを知りたいでしょうか。' );
		 
	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'どの作業のステータスを知りたいでしょうか。'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");




		// startSpeaking("Your claim has been registered with number "+ data[data.length - 1].CLAIM_NO +". Thank you and Have a nice Day!");
		  var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));	

		  
        }

    });
 }
 

 //

///////

function fetchphases(u_flag){
	  
  passtoken(post,'以下は活動のリストです');

  var data =[{"PHASE":"x"},{"PHASE":"y"},{"PHASE":"Z"}] 
  console.log(data[0]);

 $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ '以下は活動のリストです' +".</b></div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");		 var x ="<select multiple id='usecases"+ dropDownFlag +"'>";
    for(var i=0;i<data.length ;i++)
    {
    x += "<option value='" + data[i].PHASE + "'>" + data[i].PHASE  + " </option>";
    }

 x+="</select>  <button id='usecases_btn' onclick='usecaseSelect()' type='submit'  title='Type and enter'  name='usercase_btn' value='Submit'>Send</button>";
		  
console.log(x);

  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ x +".</b></div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		 passtoken(post , 'どの作業のステータスを知りたいでしょうか。' );
		 $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'どの作業のステータスを知りたいでしょうか。'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
    var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));	

		  
        }

    
 }
 

 //



///////////
// Ready Function // No change is Required

 $(function(){
	  	$("#progress").hide();
		 
     	/* $("#talk").click(function(){
	
		
		
	}); */

		 $('body').on('click', '#speech', function(){
		 startListening(function() {
			 
	      speechText = $("#status_message").val();
		  var now = new Date(Date.now());
		  var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		  	$("#progress").show();
		  if(speechText.length > 0)
		  {
		   
		  }
		   else{alert("Please speak something");
		   
		   }
		   
		   $("#status_message").val("");	
		   
		   var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));
		  
		  //Function to make ajax call to bluemix service for getting response from BOT//
		     var call = 1;
		     fetchBluemixResponse(speechText,call);
		    
	});
	
}); 


	 

		  $('body').on('click', '#send', function(){
		
		  chatText = $("#status_message").val();
		  $("#status_message").attr("value", "");
		  var now = new Date(Date.now());
		  var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		  
		  if(chatText.length > 0)
		  {
		  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-text' style='background-color:blanchedalmond'>" +chatText+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
				 }
		  else{alert("Please enter some text");}
		  
		  $("#status_message").val("");		 
		  var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));
		  
		  //Function to make ajax call to bluemix service for getting response from BOT//
		     var call = 0;
		     fetchBluemixResponse(chatText,call);
	           
	  })

	   $('body').on('keypress', '#status_message', function(e){

  if(e.keyCode == 13 && !e.shiftKey) {
   e.preventDefault();
  chatText = $("#status_message").val();
 
		  $("#status_message").attr("value", "");
		  var now = new Date(Date.now());
		  var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

		  var buttontext = 'checking button';
		  
		  if(chatText.length > 0)
		  {

           

		  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-text' style='background-color:blanchedalmond'>" +chatText+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
		   
	     
		 }
		  else{
			  alert("Please enter some text");
		
	}
		  
		  $("#status_message").val("");		 
		  var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));
		  
		  //Function to make ajax call to bluemix service for getting response from BOT//
		     var call = 0;
		     fetchBluemixResponse(chatText,call);
  }
})


//Prabhu Start

$('#lang-selector').change(function(e){
  chatLang = $("#lang-selector option:selected" ).val();
  $('#myModal').modal('hide');
  $('#livechat_charms')[0].click();
  
 
    });
	

	
	
		  
//Prabh End
 // To open chat box on click of claims icon //
	  
	  
		  	$('body').on('click', '#livechat_charms', function(){
				            var today = new Date()
var curHr = today.getHours()
       var greeting ="";
if (curHr < 12) {
  greeting= (chatLang == "JP" ? 'おはようございます！ いらっしゃいませ。ご用件を入力してください。': "Good Morning!How Can I help You");
} else if (curHr < 18) {
 
   greeting=(chatLang == "JP" ? 'こんにちは！ いらっしゃいませ。ご用件を入力してください。': "Hello Afternoon!How Can I help You");
} else {
	greeting=(chatLang == "JP" ? 'こんばんは！いらっしゃいませ。ご用件を入力してください。': "Good Evening!How Can I help You");
}     


		 passtoken(post , greeting );
			     
				 
          $('#qnimate').addClass('popup-box-on');

		
			
			 var text1 = greeting  ;

		 //<br><button  style="padding: 0px 12px;    margin-bottom: 2%;" class="btn btn-primary" onclick=xyz("' + 'Activities' + '")>Activity</button>' ;
	//	   var text2 =  text1 + '<br><button style="padding: 0px 12px;    margin-bottom: 2%;" class="btn btn-primary" onclick=xyz("' + 'Schedule' + '")>Schedule</button>' ;
		  
		  $("#greetings").html(text1);
		//   $("#greetings").html(greeting + " ");
          contentbox = $('#qnimate').html();
         var now = new Date(Date.now());
         var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

		  $("#time").html(formatted);        
        
          var data = {};
	     data.title = "";
		 data.responseContext = responseContext;
		 
// Ajax call to bluemix service to send the text. Response is fetched and is shown in chat box by appeneding in the dialog box as HTML. //
		console.log('first call');		
        $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: url1 + 'classify',                      
        success: function(data) {
              responseContext = data.context;
		}
		});
			


});
	  

		$('body').on('click', '#removeClass', function(){
		
$('#qnimate').removeClass('popup-box-on');

$('#qnimate').html(contentbox);
	$('#qnimate').replaceAll($('#qnimate'));
	responseContext="";
            });

  })
});