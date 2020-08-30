
translations = new Array();
$.getJSON('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-1.json', function (data) {
	translations = data;

	var high_score = 0;
	if(Cookies.get('high_score') != null){
		high_score = Cookies.get('high_score');
	}
	document.querySelector('#high_score').textContent = high_score;


	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	context.fillStyle = "black";
	context.font = "bold 16px Times New Roman";
	context.textAlign = "center";

	var keys = ['a','s','d','f','j','k','l',';'];

	var correct_key;

	var score = 0;

	function game_over(){
		if(score>high_score){
			Cookies.set('high_score', score);
			alert("High Score!! Game Over");
		}else{
			alert("Game Over");
		}
		location.reload();
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

	function update_word(){

		score++;
		document.querySelector('#score').textContent = score;

		context.clearRect(0, 0, canvas.width, canvas.height);
		var word_index = Math.floor(Math.random()*translations.length);

		question_type = Math.floor(Math.random()*3);
		ans_type = Math.floor(Math.random()*3);
		while(ans_type==question_type){
			ans_type = Math.floor(Math.random()*3);
		}

		var question_text = "";
		if(question_type==0){
			question_text = translations[word_index]["hanzi"];
		}else if(question_type==1){
			question_text = translations[word_index]["pinyin"];
		}else{
			question_text = translations[word_index]["translations"][0];
		}

		var ans_text = "";
		if(ans_type==0){
			ans_text = translations[word_index]["hanzi"];
		}else if(ans_type==1){
			ans_text = translations[word_index]["pinyin"];
		}else{
			ans_text = translations[word_index]["translations"][0];
		}

		context.font = "bold 48px Times New Roman";
		context.fillText(question_text, (canvas.width / 2) - 17, (canvas.height / 2) + 8);
		context.font = "bold 16px Times New Roman";

		correct_key = Math.floor(Math.random()*8);
		for(var i=0;i<8;i++){

			context.fillText(keys[i], i * 120+60, (canvas.height / 2) + 8 + 32);

			var text = '';

			if(i==correct_key){
				text = ans_text;
			}else{
				var random_word_index = Math.floor(Math.random()*translations.length);
				while(random_word_index==word_index){
					random_word_index = Math.floor(Math.random()*translations.length);
				}

				if(ans_type==0){
					text = translations[random_word_index]["hanzi"];
				}else if(ans_type==1){
					text = translations[random_word_index]["pinyin"];
				}else{
					text = translations[random_word_index]["translations"][0];
				}

			}

			multiline_fillText(text, i * 120+60, (canvas.height / 2) + 8 + 64, 10);
		}
	}

	update_word();	
	display = document.querySelector('#time');
	startTimer(60, display);

	document.addEventListener('keydown', function(event) {
    if(event.keyCode == 65){
        if(correct_key==0){
        	update_word();
        }else{
        	game_over();
        }
    }else if(event.keyCode == 83){
    	if(correct_key==1){
        	update_word();
        }else{
        	game_over();
        }
    }else if(event.keyCode == 68){
		if(correct_key==2){
        	update_word();
        }else{
        	game_over();
        }
    }else if(event.keyCode == 70){
		if(correct_key==3){
        	update_word();
        }else{
        	game_over();
        }
    }else if(event.keyCode == 74){
		if(correct_key==4){
        	update_word();
        }else{
        	game_over();
        }
    }else if(event.keyCode == 75){
		if(correct_key==5){
        	update_word();
        }else{
        	game_over();
        }
    }else if(event.keyCode == 76){
		if(correct_key==6){
        	update_word();
        }else{
        	game_over();
        }
    }else if(event.keyCode == 186){
		if(correct_key==7){
        	update_word();
        }else{
        	game_over();
        }
    }
    
	});

}).error(function(){
	console.log('error: json not loaded');
});

