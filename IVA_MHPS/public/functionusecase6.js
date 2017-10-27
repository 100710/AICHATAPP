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
         
 var FetchQuery ="UPDATE MHPSJP4 SET A_E_D =SYSDATE where PHASE ='"+phase_flag+ "'and USECASE ='" +usecase_flag +"' and PHASE_DETAIL ='" +activity_flag +"'" ;

 else if(status =='着手済' || status =='in progress')
 {

var FetchQuery ="UPDATE MHPSJP4 SET STATUS1 = '着手済' where PHASE ='"+phase_flag+ "'and USECASE ='" +usecase_flag +"' and PHASE_DETAIL ='" +activity_flag +"'" ;
 }


		 console.log('started status field is' ,status);
        data.fetchQuery =FetchQuery;		 
			$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: url1 + 'updateactivities',                      
    
      success: function(data) {

		  console.log('db call success');
		  console.log(data[0]);
		  console.log(data[1]);
		  var z ='';
		  z= data.s;
       console.log(z);

		  console.log(z);

      	  $("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div> <b>"+ z +".</b>.</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");
		 
		
		 //is there anything correct else I can help you
	
		 passtoken(post , '他に知りたいことありますでしょうか');
		 
	$("#timeStamp").append("<div class='direct-chat-msg doted-border'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'><img style='margin-left: -58px;width: 54px;border-radius: 55%;' src='Capture.PNG' alt='User Avatar' class='img-circle' /></span></div><div style='margin-top: -40px' class='direct-chat-text'>" +'他に知りたいことありますでしょうか'+ "</div><div id='timeStamp' class='direct-chat-info clearfix'><span id='time' class='direct-chat-timestamp pull-right'>" +formatted5+ "</span></div></div>");


		  var d = $('.popup-messages');
          d.scrollTop(d.prop("scrollHeight"));	

		  
        }

    });
 }




 /////////////


 ////function to fetch the list of activites based on completed/delay/progress scenaio1 usecase6
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
	//	var x ='<html><head><style> table, th, td { border: 1px solid black;}</style></head> <body><table>';
		
		//	  passtoken(post,'以下は活動のリストです'); 

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
 
