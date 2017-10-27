var stream=null;

function listen() {
	fetch('/api/speech-to-text/token')
  		.then(function(response) {
      		return response.text();
  		}).then(function (token) {

    stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
		model:'ja-JP_NarrowbandModel',
        token: token,
        outputElement: '#status_message' // CSS selector or DOM Element
    });
	
    stream.on('data', function(data) {
        if(data.results[0] && data.results[0].final) {
          stopListening();
          console.log('stop listening.');
        }
      });

    stream.on('error', function(err) {
        console.log(err);
    });

    }).catch(function(error) {
      console.log(error);
  });	
    
}

function startListening() {
	if (stream) {
    	stopListening();
    	} else {
    	  listen();
    }
}

function stopListening() {
    if (stream) {
        stream.stop();
        stream = null;
    }
}


function gettoken(cb)
{
	console.log('in get token');
	fetch('/api/text-to-speech/token')
    	.then(function(response) {
      	return response.text();
    	}).then(function (token) {
           // console.log(token);
			
			cb(token) ;

      
    });
	
}

function passtoken(token ,texttospeak)
 {

	fetch('')
    	.then(function ()
         {

      	WatsonSpeech.TextToSpeech.synthesize({
        	text: texttospeak,
            voice: 'ja-JP_EmiVoice' ,
        	token: token
      	}).on();
 });

}

function passtoken1(token ,texttospeak,cb)
 {

	fetch('')
    	.then(function ()
         {

      	WatsonSpeech.TextToSpeech.synthesize({
        	text: texttospeak,
            voice: 'ja-JP_EmiVoice' ,
        	token: token
      	}).on();
 });
 
 cb('done');
 

}

function startSpeaking(texttospeak) {

	fetch('/api/text-to-speech/token')
    	.then(function(response) {
      	return response.text();
    	}).then(function (token) {

      	WatsonSpeech.TextToSpeech.synthesize({
        	text: texttospeak,
            voice: 'ja-JP_EmiVoice' ,
        	token: token
      	}).on('error', function(err) {
        	console.log('audio error: ', err);
      	});
    });
}


//document.querySelector('.micButton').onclick = startListening;