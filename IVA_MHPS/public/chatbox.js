
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

//var url1 ='http://localhost:6012/';

var url1 ='https://mhpspm4.mybluemix.net/';



/*
  function usecaseSelect(selVal){
  $("#status_message").val(selVal);
  $("#send")[0].click();
}
*/


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





function usecaseSelect1(){
	 var fld = document.getElementsByName('usecases' + dropDownFlag);
	 var values = [];
	 /*for (var i = 0; i < fld.options.length; i++) {
	   if (fld.options[i].selected) {
	     values.push(fld.options[i].value);
	   }
	 }*/
	 
	 var checkedValue = null; 
	 
	 for(var i=0; i<fld.length; ++i){
	       if(fld[i].checked){
	    	   values.push(fld[i].value);
	       }
	 }
	 $("#status_message").val(values);
	 dropDownFlag++;
	 $("#send")[0].click();
}
gettoken(function(post){   ///get the token
console.log('token is' , post);





//Function to validate the policy number //

 function fetchBluemixResponse(chatText,call){
		         
         var data = {};
	     		
// Ajax call to bluemix service to send the text. Response is fetched and is shown in chat box by appeneding in the dialog box as HTML. //
         data.title = chatText;
		 data.responseContext = responseContext;

	//	 data.responseContext.length =0;

		 console.log('calling with chattext');	
		 console.log('db flag is',responseContext.dbflag_1);
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
		
		console.log('project flag value' , responseContext.project_flag );
		// to disable the mic button when ask for project name
		
		if(responseContext.project_flag == 'x1' )
		{
             console.log('in mic oof');
			 console.log(responseContext.project_flag );
			 
			 $("#speech").css("pointer-events", "none");
			  $('#speech').removeClass('chatIcon').addClass('chatIcon1');
			  responseContext.project_flag ='';
		}

		
else
{

			$("#speech").css("pointer-events", "auto");	
			  $('#speech').removeClass('chatIcon1').addClass('chatIcon');
}

	 responseContext.project_flag ='';	
    
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

else if(responseContext.dbflag_1 =='x5') //fetching detail from db

{
	
	var usecase_flag = responseContext.usecase_flag;//name of use case6
	var phase_flag = responseContext.phase_flag;//design,development @PHASE
	 console.log(usecase_flag,phase_flag);

//startSpeaking(data.output.text[0]);
passtoken(post , data.output.text[0]);//please wait
	 	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	
	 fetchphasedetail(usecase_flag , phase_flag) ; //calling function to get the phase_details

       responseContext.dbflag_1 ='' ;

}

////
else if(responseContext.dbflag_1 =='x6') //getting the status based on three values

{
	
	var activity_flag = responseContext.activity_flag;//name of use case  //its comma separated value.
	var usecase_flag = responseContext.usecase_flag;//name of use case6
	var phase_flag = responseContext.phase_flag;//design,development @PHASE_DETAIL
	 console.log(activity_flag ,usecase_flag,phase_flag);

//startSpeaking(data.output.text[0]);
passtoken(post , data.output.text[0]);//please wait
	 	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	 fetchstatusdetail(activity_flag ,usecase_flag,phase_flag,responseContext.dbflag_1 ) ;

       responseContext.dbflag_1 ='' ;



}

///



///

else if(responseContext.dbflag_1 =='x7') //updating the status

{
	
	var activity_flag = responseContext.activity_flag;//name of use case  //its comma separated value.
	var usecase_flag = responseContext.usecase_flag;//name of use case6
	var phase_flag = responseContext.phase_flag;//design,development @PHASE_DETAIL
	var update_flag = responseContext.status_3;  ///flag which need to be updated
	 console.log(activity_flag ,usecase_flag,phase_flag,update_flag );

//startSpeaking(data.output.text[0]);
passtoken(post , data.output.text[0]);//please wait
	 	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	 fetchstatusupdate(activity_flag ,usecase_flag,phase_flag,update_flag) ;

       responseContext.dbflag_1 ='' ;



}

///

else if (responseContext.dbflag_1 =='x4')


{

console.log('in x4');
console.log();
 //startSpeaking(data.output.text[0]);
 passtoken(post , data.output.text[0]);

 $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" + '段階を選択してください。:'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");



fetchforx4();
responseContext.dbflag_1 ='' ;
}


//


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


////usecase3


else if(responseContext.dbflag_1 =='y1') //fetching detail from db

{
	var equipment = responseContext.Equipment;//boiler..turbine
	var p_name = responseContext.P_NAME;//name of the project

	 console.log(equipment,p_name);

//startSpeaking(data.output.text[0]);
passtoken(post , data.output.text[0]);
	 	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	 fetchoccurance(p_name,equipment) ;

       responseContext.dbflag_1 ='' ;

	
	


}


else if(responseContext.dbflag_1 =='y2') //fetching detail from db

{
	var equipment = responseContext.Equipment;//boiler..turbine
	var p_name = responseContext.P_NAME;//name of the project
   var issue_name = responseContext.ISSUE_NAME;//name of the project
	 console.log(p_name,equipment,issue_name);

//startSpeaking(data.output.text[0]);
passtoken(post , data.output.text[0]);
	 	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	 fetchpendingissue(p_name,equipment,issue_name) ;

       responseContext.dbflag_1 ='' ;

	
	


}
////usecase3 scenario2
else if(responseContext.dbflag_1 =='y3') //fetching detail from db

{

	console.log('in y3');
	var equipment = responseContext.Equipment;//boiler..turbine
	var p_name = responseContext.P_NAME;//name of the project Proto-C or ALL for usecase3 scenario2
   var issue_name = responseContext.ISSUE_NAME;//occurance .. horizon deployment
    var pending_issue = responseContext.PENDING_ISSUE;//pending issue it will be input text from drop down list

	 console.log('varable are' ,p_name,equipment,issue_name,pending_issue);

//startSpeaking(data.output.text[0]);
passtoken(post , data.output.text[0]);
	 	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	 fetchpendingissue2(p_name,equipment,issue_name,pending_issue) ;

       responseContext.dbflag_1 ='' ;
	     responseContext.P_NAME ='' ;
console.log('pname is',responseContext.P_NAME);


}


////usecase3 scenario2  y4
else if(responseContext.dbflag_1 =='y4') //fetching detail from db

{
	


passtoken(post , data.output.text[0]);
	 	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	 fetchall() ;

responseContext.dbflag_1 ='' ;



}


else if(responseContext.dbflag_1 == 'y5') //fetching detail from db

{
	console.log('in y5');
	var equipment = responseContext.Equipment;//boiler..turbine

    var occurance = responseContext.ISSUE_NAME;//occurnace

	 console.log(equipment,occurance);

passtoken(post , data.output.text[0]);
	 	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	 fetchpendingissue('ALL',equipment,occurance) ;

       responseContext.dbflag_1 ='' ;
	   console.log('value of context variable is',dbflag_1);



}


else if(responseContext.dbflag_1 =='y6') //fetching detail from db

{
	console.log('in y6');
	var equipment = responseContext.Equipment;//boiler..turbine
    passtoken(post , data.output.text[0]);
	 	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");

	 fetchoccurance('ALL',equipment) ;

       responseContext.dbflag_1 ='' ;



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

////

function fetchforx4()
 {  
	 console.log('in x4 function');
	  var now = new Date(Date.now());
		 var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	 
	 var data =[{'phase': '要件定義'} , {'phase': '基本と詳細設計'} ,{'phase': '開発'}];

  var x ="<select multiple id='usecases"+ dropDownFlag +"'>";
    for(var i=0;i<data.length ;i++)
    {
    x += "<option value='" + data[i].phase + "'>" + data[i].phase  + " </option>";
    }

 x+="</select>  <button id='usecases_btn' onclick='usecaseSelect()' type='submit'  title='Type and enter'  name='usercase_btn' value='Submit'>Send</button>";

$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" + x+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
 }

 ////fetch all the Causes...


 function fetchall()  ////usecase3 scenario2
 {  
	 console.log('in fetchall function');
	  var now = new Date(Date.now());
		 var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	 
	 var data =[{'phase': '客先要求'} , {'phase': '基本計画不備'} ,{'phase': '合理化、ｺｽﾄ低減提案'},{'phase': 'デビエーション'} , {'phase': '設計不適合(ﾐｽ、ﾙｰﾙ未反映、他)'} ,{'phase': '遅延(出図、引合、発注、納期、他)'},{'phase': '検査・品質・性能不適合 H:製作時不適合'} , {'phase': '設計連絡不備'} ,{'phase': 'ＤＯＲ不備(含ｻﾌﾞｺﾝ、客先、他)'},
	 
	 {'phase': '見積不備(含見積落ち) '},{'phase': '不適合水平展開'} , {'phase': '契約不備(含ｻﾌﾞｺﾝ、他) '}];

  var x ="<select multiple id='usecases"+ dropDownFlag +"'>";
    for(var i=0;i<data.length ;i++)
    {
    x += "<option value='" + data[i].phase + "'>" + data[i].phase  + " </option>";
    }

 x+="</select>  <button id='usecases_btn' onclick='usecaseSelect()' type='submit'  title='Type and enter'  name='usercase_btn' value='Submit'>Send</button>";

$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" + x+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" + 'どの発生原因による不適合をお探しですか？'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
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

//////////function for usecase3 scenario1



 ////function to fetch the list of activites based on completed/delay/progress
  function fetchoccurance(p_name,equipment){
	  console.log('in fetch activity fucntion') ;
	     	 var now = new Date(Date.now());
		 var formatted5 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		 var data ={}; 
		var FetchQuery = '';
	  

      if(p_name =='Proto-C')  //complete
	  {

	  console.log('in protoc');
	 
	     FetchQuery ="SELECT DISTINCT  OCCURANCE FROM  MHPSJPUC31 where PENDING_ISSUE LIKE '%"+ equipment +"%' AND P_NAME ='" + p_name + "'  ";
	  console.log(FetchQuery);
	}
		
		else if(p_name =='Proto-B') //late
         var FetchQuery ="SELECT DISTINCT  OCCURANCE FROM  MHPSJPUC31 where PENDING_ISSUE LIKE  '%"+ equipment +"%' AND P_NAME ='" + p_name + "'  ";


		 else if(p_name =='ALL')
		 {
  var FetchQuery ="SELECT  DISTINCT  OCCURANCE  FROM  MHPSJPUC31 where PENDING_ISSUE LIKE  '%"+ equipment +"%'"
 +  "  UNION  " + "SELECT DISTINCT  OCCURANCE  FROM  PROTOB where PENDING_ISSUE LIKE  '%"+ equipment +"%'"
+	"  UNION  "  + "SELECT DISTINCT  OCCURANCE  FROM  PROTOA where PENDING_ISSUE LIKE  '%"+ equipment +"%'"


 console.log('in protoc' ,FetchQuery);


		 }
        else    //check for datbase A

        var FetchQuery ="SELECT DISTINCT  OCCURANCE FROM  MHPSJPUC31 where PENDING_ISSUE LIKE  '%"+ equipment +"%' AND P_NAME ='" + p_name + "'  ";

        data.fetchQuery =FetchQuery;		 
			$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: url1 + 'fetchactivities',                      
    
      success: function(data) {

		  console.log('db call success for usecase31');
		  console.log(data[0]);
		  var x ='<html><head><style> table, th, td { border: 1px solid black;}</style></head> <body><table>';
		  
		  for(var i=0;i<data.length ;i++)

		  {
			  
			 x += '<tr><td style="width:50%">'+ data[i].OCCURANCE + '</td></tr>' ;
			// console.log(x);
		  }
          x+='</table></body></html>';
		  console.log(x);
          

      	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ x +".</b>.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		 
		 //Occurance due to which you would like to search
		 
		 //startSpeaking('他に知りたいことありますでしょうか');
		  passtoken(post, 'お探ししたい問題の発生原因を教えてください。');
		 
		 
	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'お探ししたい問題の発生原因を教えてください。'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");

      var d = $('.popup-messages');
     d.scrollTop(d.prop("scrollHeight"));	

		  
        }

    });
 }
 

 //





 ////function to fetch the list of activites based on completed/delay/progress
  function fetchpendingissue(p_name,equipment,issue_name){
	  console.log('in fetch activity fucntion') ;
	     	 var now = new Date(Date.now());
		 var formatted5 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		 var data ={}; 
		var FetchQuery = '';
		var issue ='';

	  

      if(p_name =='Proto-C')  //complete
	     FetchQuery ="SELECT   PENDING_ISSUE ,PENDING_ISSUE_DETAIL  FROM  MHPSJPUC311 where PENDING_ISSUE LIKE  '%"+ equipment +"%' AND  OCCURANCE ='"+ issue_name+"'";

		
		else if(p_name =='Proto-B') //late
         var FetchQuery ="SELECT PENDING_ISSUE ,PENDING_ISSUE_DETAIL  FROM  PROTOB where PENDING_ISSUE LIKE  '%"+ equipment +"%' AND  OCCURANCE ='"+ issue_name+"'";
        else if(p_name =='Proto-A')   //check for datbase A

        var FetchQuery ="SELECT PENDING_ISSUE ,PENDING_ISSUE_DETAIL  FROM  PROTOA where PENDING_ISSUE LIKE  ' %"+ equipment +"%' AND OCCURANCE = '"+ issue_name+"'";
		else if(p_name =='ALL')

		{
  var FetchQuery ="SELECT  PENDING_ISSUE ,PENDING_ISSUE_DETAIL  FROM  MHPSJPUC31 where PENDING_ISSUE LIKE  '%"+ equipment +"%'  AND OCCURANCE = '"+ issue_name+"'"
 +  "  UNION  " + "SELECT PENDING_ISSUE ,PENDING_ISSUE_DETAIL  FROM  PROTOB where PENDING_ISSUE LIKE  '%"+ equipment +"%' AND   OCCURANCE = '"+ issue_name+"'"
+	"  UNION  "  + "SELECT PENDING_ISSUE ,PENDING_ISSUE_DETAIL  FROM  PROTOA where PENDING_ISSUE LIKE  '%"+ equipment +"%' AND   OCCURANCE = '"+ issue_name+"'"
console.log('query is',FetchQuery);
		}

		else 
		var FetchQuery ="SELECT PENDING_ISSUE ,PENDING_ISSUE_DETAIL  FROM  MHPSJPUC33 where PENDING_ISSUE LIKE  ' %"+ equipment +"%' AND  P_NAME = '" + p_name + "' AND OCCURANCE = '"+ issue_name+"'";

        data.fetchQuery =FetchQuery;		 
			$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: url1 + 'fetchactivities',                      
    
      success: function(data) {

		  console.log('db call success for usecase31');
		  console.log(data[0]);
		  console.log('data length is ', data.length);
		  
		  if(data.length ==0)
		  {
			  
			  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'申し訳ございません。この原因による懸案項目は見つかりませんでした。他の発生原因をお尋ねください。'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
     
		  }
	  
	  else
	  {
		  //var x ='<html><head><style> table, th, td { border: 1px solid black;}</style></head> <body><table>';
		   var x ="<select multiple id='usecases"+ dropDownFlag +"'>";
		  for(var i=0;i<data.length ;i++)
		  {
			 x += "<option value='" + data[i].PENDING_ISSUE+ "'>" + data[i].PENDING_ISSUE + " </option>";
			//var y  ='Pending Issue Detail:' + '<br>' +  data[i].PENDING_ISSUE_DETAIL ;

			// x += "<input type='checkbox' title='" + y  + "' name='usecases" + dropDownFlag + "' value='" + data[i].PENDING_ISSUE+ "'>"+ data[i].PENDING_ISSUE + "<br>";
			
		  }
		  
 x+="</select>  <button id='usecases_btn' onclick='usecaseSelect()' type='submit'  title='Type and enter'  name='usercase_btn' value='Submit'>Send</button>";
        //  x+='</table></body></html>';
		  
		  console.log(x);
          

      	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ x +".</b>.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		 

		passtoken(post, 'ご覧になりたい不適合を選択してください。');
		 		 
	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'ご覧になりたい不適合を選択してください。'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
 /*      
setTimeout(function(){
passtoken(post, '他に知りたいことありますでしょうか');  
$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'他に知りたいことありますでしょうか'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
	   
},9000);
*/	

	  }

      var d = $('.popup-messages');
     d.scrollTop(d.prop("scrollHeight"));	

		  
        }

    });
 }
 ////usecase3 scenario1 with y3


  function fetchpendingissue2(p_name,equipment,issue_name,pending_issue){
	  console.log('in fetch activity fucntion') ;
	     	 var now = new Date(Date.now());
		 var formatted5 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		 var data ={}; 
		var FetchQuery = '';
		var issue ='';

		if(p_name =='ALL')
		{

		FetchQuery ="SELECT  'Proto-C' P_NAME ,PENDING_ISSUE,PENDING_ISSUE_DETAIL, PROCESSING_STATUS,DATE_OF_OCCURANCE,PROCESSING_DEADLINE,PROCESSING_STATUS1,COMPLETION_DATE,CAUSE_OF_OCCURANCE,PENDING_ISSUE_STATUS,ACTUAL_VALUE,COST_RESPONSIBILITY_DEVISION,COST_RANGE,COST_CATEGORY,COST_FOLLOW_UP,PROBABILITY_OF_OCCURNACE ,SCHEDULE_IMPACT ,COMPLAINT_HANDLING FROM  MHPSJPUC311 where PENDING_ISSUE LIKE  '%"+ equipment +"%'  AND OCCURANCE ='"+ issue_name+"' AND PENDING_ISSUE = '"+ pending_issue + "'"
		+ " UNION "  + "SELECT  'Proto-B' P_NAME ,PENDING_ISSUE,PENDING_ISSUE_DETAIL, PROCESSING_STATUS,DATE_OF_OCCURANCE,PROCESSING_DEADLINE,PROCESSING_STATUS1,COMPLETION_DATE,CAUSE_OF_OCCURANCE,PENDING_ISSUE_STATUS,ACTUAL_VALUE,COST_RESPONSIBILITY_DEVISION,COST_RANGE,COST_CATEGORY,COST_FOLLOW_UP,PROBABILITY_OF_OCCURNACE ,SCHEDULE_IMPACT ,COMPLAINT_HANDLING FROM  PROTOB where PENDING_ISSUE LIKE  '%"+ equipment +"%' AND  OCCURANCE ='"+ issue_name+"' AND PENDING_ISSUE = '"+ pending_issue + "'"
		+ " UNION " + "SELECT  'Proto-A' P_NAME ,PENDING_ISSUE,PENDING_ISSUE_DETAIL, PROCESSING_STATUS,DATE_OF_OCCURANCE,PROCESSING_DEADLINE,PROCESSING_STATUS1,COMPLETION_DATE,CAUSE_OF_OCCURANCE,PENDING_ISSUE_STATUS,ACTUAL_VALUE,COST_RESPONSIBILITY_DEVISION,COST_RANGE,COST_CATEGORY,COST_FOLLOW_UP,PROBABILITY_OF_OCCURNACE ,SCHEDULE_IMPACT ,COMPLAINT_HANDLING FROM  PROTOA where PENDING_ISSUE LIKE  '%"+ equipment +"%' AND  OCCURANCE ='"+ issue_name+"' AND PENDING_ISSUE = '"+ pending_issue + "'";	
		}

		
		else


FetchQuery ="SELECT  P_NAME ,PENDING_ISSUE,PENDING_ISSUE_DETAIL, PROCESSING_STATUS,DATE_OF_OCCURANCE,PROCESSING_DEADLINE,PROCESSING_STATUS1,COMPLETION_DATE,CAUSE_OF_OCCURANCE,PENDING_ISSUE_STATUS,ACTUAL_VALUE,COST_RESPONSIBILITY_DEVISION,COST_RANGE,COST_CATEGORY,COST_FOLLOW_UP,PROBABILITY_OF_OCCURNACE ,SCHEDULE_IMPACT ,COMPLAINT_HANDLING FROM  MHPSJPUC311 where PENDING_ISSUE LIKE  '%"+ equipment +"%' AND P_NAME ='" + p_name + "' AND OCCURANCE ='"+ issue_name+"' AND PENDING_ISSUE = '"+ pending_issue + "'";

	

        data.fetchQuery =FetchQuery;		 
			$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: url1 + 'fetchactivities',                      

      success: function(data) {

		  console.log('db call success for usecase311');
		  console.log(data[0]);
		  console.log(data.length);
		    var x ='<html><head><style> table, th, td { border: 1px solid black;}</style></head> <body>';
		  for(var i=0;i<data.length;i++)
		  {
		
		  x+='<details><summary>'+data[i].P_NAME +'</summary>'
		    x+='<details> <summary>プロジェクト名</summary> <p>' +  data[i].P_NAME + '</p></details>'
			+'<details> <summary>懸案項目</summary> <p>' + data[i].PENDING_ISSUE + '</p></details>'
			+'<details> <summary>懸案内容</summary> <p>' +  data[i].PENDING_ISSUE_DETAIL + '</p></details>'
			+'<details> <summary>処理状況</summary> <p>' + data[i].PROCESSING_STATUS + '</p></details>'
			+'<details> <summary>懸案 発生日</summary> <p>' +  data[i].DATE_OF_OCCURANCE + '</p></details>'
			+'<details> <summary>処理期限</summary> <p>' + data[i].PROCESSING_DEADLINE+ '</p></details>'
			+'<details> <summary>処理完了</summary> <p>' +  data[i].PROCESSING_STATUS1 + '</p></details>'
			+'<details> <summary>完了日</summary> <p>' + data[i].COMPLETION_DATE + '</p></details>'
			+'<details> <summary>発生原因</summary> <p>' +  data[i].CAUSE_OF_OCCURANCE + '</p></details>'
			+'<details> <summary>懸案 状況</summary> <p>' + data[i].PENDING_ISSUE_STATUS + '</p></details>'
            +'<details> <summary>実額</summary> <p>' +  data[i].ACTUAL_VALUE + '</p></details>'
			+'<details> <summary>ｺｽﾄ責任課</summary> <p>' + data[i].COST_RESPONSIBILITY_DEVISION + '</p></details>'
			+'<details> <summary>ｺｽﾄﾚﾝｼﾞ</summary> <p>' +  data[i].COST_RANGE + '</p></details>'
			+'<details> <summary>ｶﾃｺﾞﾘ</summary> <p>' + data[i].COST_CATEGORY + '</p></details>'
			+'<details> <summary>ｺｽﾄﾌｫﾛｰ</summary> <p>' +  data[i].COST_FOLLOW_UP + '</p></details>'
			+'<details> <summary>発生</summary> <p>' + data[i].PROBABILITY_OF_OCCURNACE + '</p></details>'
			+'<details> <summary>ｽｹｼﾞｭｰﾙ</summary> <p>' +  data[i].SCHEDULE_IMPACT + '</p></details>'
			+'<details> <summary>ｸﾚｰﾑ対象</summary> <p>' + data[i].COMPLAINT_HANDLING + '</p></details>'
			+'</details>'
		  }

		x+='</body></html>';
		  
		  console.log(x);
          

      	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ x +".</b>.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		 
		 //is there anything correct else I can help you
		 
		 //startSpeaking('他に知りたいことありますでしょうか');
		// passtoken(post, '他に知りたいことありますでしょうか');
		passtoken(post, '詳細をご覧になるには各項目をクリックしてください');
		 		 
	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'詳細をご覧になるには各項目をクリックしてください'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
       
setTimeout(function(){
passtoken(post, '他に知りたいことありますでしょうか');  
$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'他に知りたいことありますでしょうか'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
	   
},9000);	

      var d = $('.popup-messages');
     d.scrollTop(d.prop("scrollHeight"));	

		  
        }

    });
 }
 


 // with y3

////////////
 ////function to update the status scenario 3 usecase6



 function fetchstatusupdate(activity_flag ,usecase_flag,phase_flag,status_update)  //to update the status
  
  {
	  console.log('in update statusfucntion') ;
	     	 var now = new Date(Date.now());
		 var formatted5 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

		 var activity_flag =activity_flag;
         var usecase_flag=usecase_flag;
         var phase_flag =phase_flag;
		 var status = status_update ;
		  var data ={}; 

		  if (status =='completed' || status == '完了') ///if user want to update the status as complete

         
 var FetchQuery ="UPDATE MHPSJP4 SET A_E_D =SYSDATE ,STATUS1 ='着手済' where PHASE ='"+phase_flag+ "' and USECASE ='" +usecase_flag +"' and PHASE_DETAIL ='" +activity_flag +"'" ;

 else if(status =='着手済' || status =='in progress' || status == '着手済み' || status =='進行中')  //in progess/started if user want to update the status
 {

var FetchQuery ="UPDATE MHPSJP4 SET STATUS1 = '着手済' where PHASE ='"+phase_flag+ "'and USECASE ='" +usecase_flag +"' and PHASE_DETAIL ='" +activity_flag +"'" ;
 }
 else 

  var FetchQuery ="UPDATE MHPSJP4 SET A_E_D =SYSDATE ,STATUS1 ='着手済' where PHASE ='"+phase_flag+ "' and USECASE ='" +usecase_flag +"' and PHASE_DETAIL ='" +activity_flag +"'" ;


		 console.log('query is' ,FetchQuery);
        data.fetchQuery =FetchQuery;		 
			$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: url1 + 'updatestatus',                      
    
      success: function(data) {

		  console.log('db call success');
		  console.log(data[0]);
		 
		  var z ='';
		  z= data[0].text;
       console.log(z);

		  console.log(z);

      	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ z +".</b>.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		 
		
		 //is there anything correct else I can help you

	//setTimeout(function(){
		 passtoken(post , '他に知りたいことありますでしょうか');
		 
	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'他に知りたいことありますでしょうか'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
	//},3000);


		  var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));	

		  
        }

    });
 }




 /////////////


 ////function to fetch the list of activites based on completed/delay/progress scenaio1 usecase6
  function fetchstatusdetail(activity_flag ,usecase_flag,phase_flag,dbflag_1)
  
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

	        console.log('length is 1');

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
		  
		  if(dbflag_1 == 'x6')
		  z+=  x;

		  else
		  z+= '<br>' + data[i].PHASE_DETAIL + '<br>'  + x

 console.log(z);
 
		  }
		  
		  console.log(z);

      	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ z +".</b>.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		 
		 //is there anything correct else I can help you
		 
		 //startSpeaking('他に知りたいことありますでしょうか');
		 passtoken(post , '他に知りたいことありますでしょうか');

		 if(dbflag_1 =='x6')
		 $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'ステータスを何に変更しますか '+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");

		 else
		 
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
	//	var x ='<html><head><style> table, th, td { border: 1px solid black;}</style></head> <body><table>';
		
		

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
		setTimeout(function(){
		 passtoken(post , 'どの作業のステータスを知りたいでしょうか。' );
		 
	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'どの作業のステータスを知りたいでしょうか。'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		},3000);


		  var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));	

		  
        }

    });
 }
 


 ////




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
  $('#lang-selector option').prop('selected', function() {
      return this.defaultSelected;
  });
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