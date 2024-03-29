function shuffle(a){
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var words_correct = new Array();
var words_wrong = new Array();
var words_left = new Array();

var chosen_words = new Array();

// var words_wrong_history = new Array();

var $_GET = {};
if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                   .toString()
                   // get the query string
                   .replace(/^.*?\?/, '')
                   // and remove any existing hash string (thanks, @vrijdenker)
                   .replace(/#.*$/, '')
                   .split('&');

    for(var i=0, l=query.length; i<l; i++) {
       var aux = decodeURIComponent(query[i]).split('=');
       $_GET[aux[0]] = aux[1];
    }
}

var starting_words_left = new Array();
translations = new Array();
$.getJSON('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-'+$_GET['level']+'.json', function (data) {

	translations = data;

	//Slice size is 8!!
	// translations = translations.slice(0,8);

	//Filling the words left array
	Object.keys(translations).forEach(function(k){

		//Hanzi and Pinyin
		if(Math.floor(Math.random()*2)){
			words_left.push({id: k, question: 'hanzi', answer: 'pinyin'});
		}else{
			words_left.push({id: k, question: 'pinyin', answer: 'hanzi'});
		}

		//Pinyin and Translation
		if(Math.floor(Math.random()*2)){
			words_left.push({id: k, question: 'pinyin', answer: 'translation'});
		}else{
			words_left.push({id: k, question: 'translation', answer: 'pinyin'});
		}

		//Translation and Hanzi
		if(Math.floor(Math.random()*2)){
			words_left.push({id: k, question: 'translation', answer: 'hanzi'});
		}else{
			words_left.push({id: k, question: 'hanzi', answer: 'translation'});
		}
	});  
	shuffle(words_left);

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	context.fillStyle = "black";
	context.font = "bold 16px Times New Roman";
	context.textAlign = "center";

	var keys = ['a','s','d','f','j','k','l',';'];

	var correct_key;

	var score = 0;

	function game_over(){
		Cookies.set('words_wrong', JSON.stringify(words_wrong));
		Cookies.set('words_correct', JSON.stringify(words_correct));
		window.location.replace('./stats.html?level='+$_GET['level']);
	}

	function startTimer(duration, display) {
	    var timer = duration, minutes, seconds;
	    setInterval(function () {
	        minutes = parseInt(timer / 60, 10);
	        seconds = parseInt(timer % 60, 10);

	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        display.textContent = minutes + ":" + seconds;

	        if (--timer < 0) {
	            game_over();
	        }
	    }, 1000);
	}

	function multiline_fillText(text, x, y, maxWidth){

		var linesPrinted = 0;

		var buffer = "";

		for(var i=0;i<text.length;i++){
			buffer += text[i];
			if(i%maxWidth==0 && i!=0){
				context.fillText(buffer, x, y+(linesPrinted++)*16);
				buffer = "";
			}
		}
		context.fillText(buffer, x, y+(linesPrinted++)*16);
	}

	function id_type_to_text(id, type){
		if(type=='hanzi'){
			return translations[id]['hanzi'];
		}
		if(type=='pinyin'){
			return translations[id]['pinyin'];
		}
		if(type=='translation'){
			return translations[id]['translations'][0];
		}
	}

	function update_word(){

		if(words_left.length<=0){
			game_over();
		}

		$("#dis_words_correct").text(words_correct.length);
		$("#dis_words_wrong").text(words_wrong.length);
		$("#dis_words_left").text(words_left.length);

		context.clearRect(0, 0, canvas.width, canvas.height);

		context.font = "bold 48px Times New Roman";
		context.fillText(id_type_to_text(words_left[0]['id'], words_left[0]['question']), (canvas.width / 2) - 17, (canvas.height / 2) + 8);
		context.font = "bold 16px Times New Roman";

		correct_key = Math.floor(Math.random()*8);

		var printed_ids = new Array();

		for(var i=0;i<8;i++){

			context.fillText(keys[i], i * 120+60, (canvas.height / 2) + 8 + 32);

			var text = '';

			if(i==correct_key){
				text = id_type_to_text(words_left[0]['id'], words_left[0]['answer']);
				printed_ids.push(parseInt(words_left[0]['id']));
			}else{
				var random_word_index = Math.floor(Math.random()*translations.length);

				while(printed_ids.includes(random_word_index)){
					random_word_index = Math.floor(Math.random()*translations.length);
				}
				printed_ids.push(random_word_index);

				text = id_type_to_text(random_word_index, words_left[0]['answer']);
			}

			multiline_fillText(text, i * 120+60, (canvas.height / 2) + 8 + 64, 10);
		}
	}

	update_word();	
	display = document.querySelector('#time');
	startTimer(Number($_GET['time']), display);

	document.addEventListener('keydown', function(event) {

	    if(event.keyCode == 65){
	        if(correct_key==0){
	        	words_correct.push(words_left[0]['id']);
	        	words_left.shift();
	        }else{
	        	words_wrong.push(words_left[0]['id']);
	        	words_left.shift();
	        }
	    }else if(event.keyCode == 83){
	    	if(correct_key==1){
	        	words_correct.push(words_left[0]['id']);
	        	words_left.shift();
	        }else{
	        	words_wrong.push(words_left[0]['id']);
	        	words_left.shift();
	        }
	    }else if(event.keyCode == 68){
			if(correct_key==2){
	        	words_correct.push(words_left[0]['id']);
	        	words_left.shift();
	        }else{
	        	words_wrong.push(words_left[0]['id']);
	        	words_left.shift();
	        }
	    }else if(event.keyCode == 70){
			if(correct_key==3){
	        	words_correct.push(words_left[0]['id']);
	        	words_left.shift();
	        }else{
	        	words_wrong.push(words_left[0]['id']);
	        	words_left.shift();
	        }
	    }else if(event.keyCode == 74){
			if(correct_key==4){
	        	words_correct.push(words_left[0]['id']);
	        	words_left.shift();
	        }else{
	        	words_wrong.push(words_left[0]['id']);
	        	words_left.shift();
	        }
	    }else if(event.keyCode == 75){
			if(correct_key==5){
	        	words_correct.push(words_left[0]['id']);
	        	words_left.shift();
	        }else{
	        	words_wrong.push(words_left[0]['id']);
	        	words_left.shift();
	        }
	    }else if(event.keyCode == 76){
			if(correct_key==6){
	        	words_correct.push(words_left[0]['id']);
	        	words_left.shift();
	        }else{
	        	words_wrong.push(words_left[0]['id']);
	        	words_left.shift();
	        }
	    }else if(event.keyCode == 186){
			if(correct_key==7){
	        	words_correct.push(words_left[0]['id']);
	        	words_left.shift();
	        }else{
	        	words_wrong.push(words_left[0]['id']);
	        	words_left.shift();
	        }
	    }

	    update_word();	
    
	});

}).error(function(){
	console.log('error: json not loaded');
});

