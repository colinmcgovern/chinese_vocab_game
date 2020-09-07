var words_wrong_string = "";
var words_correct_string = "";

var words_wrong = new Array();
var words_correct = new Array();

var chosen_words = new Array();

var words_wrong_history = new Array();

translations = new Array();
$.getJSON('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-1.json', function (data) {

	translations = data;

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

	if(Cookies.get('words_wrong') != null){
		words_wrong = JSON.parse(decodeURIComponent(Cookies.get('words_wrong')));
	}
	
	if(Cookies.get('words_correct') != null){
		words_correct = JSON.parse(decodeURIComponent(Cookies.get('words_correct')));
	}

	//Get wrong word history
	if(Cookies.get('words_wrong_history') != null){
		words_wrong_history = JSON.parse(decodeURIComponent(Cookies.get('words_wrong_history')));
		console.log("1"); //del
		console.log(words_wrong_history); //del

		var words_wrong_history_totals = new Array();

		words_wrong_history.forEach(item => {
			words_wrong_history_totals[item['id']]++;
		});

		console.log("2"); //del
		console.log(words_wrong_history_totals); //del

		words_wrong_history_totals.sort(function(a, b) {
    		return a - b;
		});

		console.log("3"); //del
		console.log(words_wrong_history_totals); //del

		Object.keys(words_wrong_history_totals).forEach(function(k){
			if(chosen_words < 4 && words_wrong_history_totals[k]!=0){
				chosen_words.push(k);
			}
		});

		console.log("4"); //del
		console.log(chosen_words); //del
	}

	words_wrong.forEach( item => {
		words_wrong_string = words_wrong_string.concat(id_type_to_text(item['id'],item['question']));
		words_wrong_string = words_wrong_string.concat(' -> ');	
		words_wrong_string = words_wrong_string.concat(id_type_to_text(item['id'],item['answer']));
		words_wrong_string = words_wrong_string.concat(', \n');
	});
	$("#dis_words_wrong").text(words_wrong_string);

	words_correct.forEach( item => {
		words_correct_string = words_correct_string.concat(id_type_to_text(item['id'],item['question']));
		words_correct_string = words_correct_string.concat(' -> ');	
		words_correct_string = words_correct_string.concat(id_type_to_text(item['id'],item['answer']));
		words_correct_string = words_correct_string.concat(', \n');
	});
	$("#dis_words_correct").text(words_correct_string);

});