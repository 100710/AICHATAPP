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
function isValidDate(s) {
  var bits = s.split('/');
  var d = new Date(bits[2], bits[1] - 1, bits[0]);
  return d && (d.getMonth() + 1) == bits[1];
}


function toDate(str) {
    const [day, month, year] = str.split("/")
    return new Date(year, month - 1, day)
    
} 

//Function to validate the policy number //

 function fetchBluemixResponse(chatText,call){
		         
         var data = {};
	     		
// Ajax call to bluemix service to send the text. Response is fetched and is shown in chat box by appeneding in the dialog box as HTML. //

           data.title = chatText;
		 //data.responseContext = responseContext;	
	
        $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: 'http://localhost:6006/classify',                      
        success: function(data) {
        console.log('success');
	    responseContext = data.context;
		
if(responseContext.check_policy_flg == 1 || responseContext.date_flg ==1 || responseContext.pincode_flg==1)
		{
              $("#speech").css("pointer-events", "none");
			  $('#speech').removeClass('chatIcon').addClass('chatIcon1');
		}

		


		var now = new Date(Date.now());
		var formatted1 = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();			
		var policyNo = "" ;
	
		//Call this method if flag is set as 1 in context response //
		//if value is set as 1 we will call fetchPolicy function to validate the policy //


            if(call ==1 && responseContext.unknown_flg == 1 && chkExitFlg ==0)
			{
	 $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;display:none; width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top:0px' class='direct-chat-text'>Sorry I do not understand, Can you kindly repeat.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
	
	     	startSpeaking("Sorry I do not understand, Can you kindly repeat.");
		    $("#progress").hide();
			chkExitFlg=1;	

		}
		

            else if(call ==1 && responseContext.unknown_flg == 2)
			{
				
			$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>You can visit our website www.abc.com/raiseclaim or you can reach out to our toll free number 01800001234. Have a nice Day!</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
	startSpeaking("You can visit our website www.abc.com/raiseclaim or you can reach out to our toll free number 01800001234. Have a nice Day!");	
		$("#progress").hide();
		 var d = $('.popup-messages');
            d.scrollTop(d.prop("scrollHeight"));	
		
	chkExitFlg=0;
	responseContext.unknown_flg=0;
		}
 

else
{


if(chkResponseExtFlg == 0 && responseContext.unknown_flg == 1 )
		{

$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px; width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top:-47px' class='direct-chat-text'>Sorry I do not understand, Can you kindly repeat.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
	
	     startSpeaking("Sorry I do not understand, Can you kindly repeat.");
    var d = $('.popup-messages');
            d.scrollTop(d.prop("scrollHeight"));
             chkResponseExtFlg =1;
		}

else if(data.output.text[0] == null && data.output.text[1] == null)
{
$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px; width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top:-47px' class='direct-chat-text'>Sorry I do not understand, Can you kindly repeat.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
	
	     startSpeaking("Sorry I do not understand, Can you kindly repeat.");
    var d = $('.popup-messages');
            d.scrollTop(d.prop("scrollHeight"));
             chkResponseExtFlg =1;
			 if(responseContext.unknown_flg !=1 && responseContext.unknown_flg !=2)
			 {
			 responseContext.unknown_flg =1;
			 }



}

 else if(data.context.unknown_flg ==2)
		{
            $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>You can visit our website www.abc.com/raiseclaim or you can reach out to our toll free number 01800001234. Have a nice Day!</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
	startSpeaking("You can visit our website www.abc.com/raiseclaim or you can reach out to our toll free number 01800001234. Have a nice Day!");
	
    var d = $('.popup-messages');
            d.scrollTop(d.prop("scrollHeight"));	
		

 responseContext.unknown_flg = 0 ;
			chkResponseExtFlg =0;

}

		else if(data.context.end_conversation == 1)

		{
			 responseContext.unknown_flg = 0 ;
			chkResponseExtFlg =0;
			$("#progress").hide();
			$("#speech").css("pointer-events", "auto");	
           if(data.output.text[0]=="")
		{
		
			$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[1]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
		startSpeaking(data.output.text[1]);
		   var d = $('.popup-messages');
            d.scrollTop(d.prop("scrollHeight"));	
		

		}
		else{
        
		$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
		startSpeaking(data.output.text[0]);
		   var d = $('.popup-messages');
            d.scrollTop(d.prop("scrollHeight"));	
	

		}
          
	}
	

	else
	{

 if(call==1)
 {
chkExitFlg=0;

responseContext.unknown_flg=0;
$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-text' style='background-color:blanchedalmond'>" +speechText+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
 $("#progress").hide(); 
 chkResponseExtFlg =0;

}



           
	


		if( data.context.policy_flg == 1)
		{

	    var policyNo = responseContext.policy_num ;
       if(data.output.text[0]=="")
		{
			$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[1]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
		startSpeaking(data.output.text[1]);
		}
		else{
       $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
	
	if(policyNo.length >0)
	{
		
		startSpeaking("Validating your policy");
		 responseContext.unknown_flg = 0 ;
			chkResponseExtFlg =0;
	}		       		
		}
	
		
	    fetchPolicyDetails(policyNo);
		
		}

		else if(data.context.date_flg==1)
		{
				$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>Kindly enter date of theft in the format of DDMMYYYY.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
				startSpeaking("Kindly enter date of theft in the format of DDMMYYYY.");
		}
       
	
		else if(data.context.claim_flg == 1)
		{
			if(data.output.text[0]=="")
		{
				
			$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[1]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
		
		}
		else{
       $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
		startSpeaking(data.output.text[0]);
        		
		}
			insertClaimRegDetails();
		}			
		
		else
		{
 responseContext.unknown_flg = 0 ;
			chkResponseExtFlg =0;
if(responseContext.check_policy_flg == 1 || responseContext.date_flg ==1 || responseContext.pincode_flg==1)
		{
			  $('#speech').removeClass('chatIcon').addClass('chatIcon1');
              $("#speech").css("pointer-events", "none");
			  responseContext.pincode_flg=0;

		}
else
{

			$("#speech").css("pointer-events", "auto");	
			  $('#speech').removeClass('chatIcon1').addClass('chatIcon');
}
			if(data.output.text[0]=="")
		{
		
			$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[1]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
		startSpeaking(data.output.text[1]);
		}
		else{
        
		$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +data.output.text[0]+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted1+ "</span></div></div>");
		startSpeaking(data.output.text[0]);
		}
		}
		
        var d = $('.popup-messages');
        d.scrollTop(d.prop("scrollHeight"));	
	}
        }
		},
        error: function(error) {
            console.log("some error in fetching the notifications");
         }

    });
         
  }


 function commaSeparateNumber(val){
    while (/(\d+)(\d{1})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{1})/, '$1'+','+'$2');
    }
    return val;
  }

  function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

 
 
    
 
 

// Ready Function //

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
		   else{alert("Please speak something");}
		   
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
  }
})
	
 // To open chat box on click of claims icon //
	  
$('body').on('click', '#livechat_charms', function(){
				            var today = new Date()
var curHr = today.getHours()
       var greeting ="";
if (curHr < 12) {
  greeting='Good Morning';
} else if (curHr < 18) {
 
   greeting='Good Afternoon';
} else {

  greeting='Good evening';
}     


			   startSpeaking(greeting + ", How may i help you");
			     
          $('#qnimate').addClass('popup-box-on');
		   $("#greetings").html(greeting + ", How may i help you");
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
        url: 'http://localhost:6006/classify',                      
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