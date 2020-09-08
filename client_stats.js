function print(v){
	console.log(JSON.parse(JSON.stringify(v)));
}

var words_wrong_string = "";
var words_correct_string = "";

var words_wrong = new Array();
var words_correct = new Array();

var chosen_words = new Array();

var words_wrong_history = new Map();

translations = new Array();
$.getJSON('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-1.json', function (data) {

	translations = data;
	translations = translations.filter(function (v) {
		return v != null;
	});

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
	words_wrong = words_wrong.filter(function (v) {
		return v != null;
	});
	
	if(Cookies.get('words_correct') != null){
		words_correct = JSON.parse(decodeURIComponent(Cookies.get('words_correct')));
	}
	words_correct = words_correct.filter(function (v) {
		return v != null;
	});

	//Choosing words
	//Get wrong word history
	if(Cookies.get('words_wrong_history') != null){

		words_wrong_history = JSON.parse(decodeURIComponent(Cookies.get('words_wrong_history')));
		words_wrong_history = words_wrong_history.filter(function (v) {
			return v != null;
		});

		print("words_wrong_history"); //del
		print(words_wrong_history); //del

		var words_wrong_history_totals = new Map();

		translations.forEach(item => {
			words_wrong_history_totals.set(item['id'],0);
		});

		print("words_wrong_history_totals when empty"); //del
		print(words_wrong_history_totals); //del

		words_wrong_history.forEach(item => {
			words_wrong_history_totals.set(item['id'], words_wrong_history_totals.get(item['id'])++ );
		});

		print("words_wrong_history_totals"); //del
		print(words_wrong_history_totals); //del

		words_wrong_history_totals.sort(function(a, b) {
    		return b - a;
		});

		print("words_wrong_history_totals sorted"); //del
		print(words_wrong_history_totals); //del

		Object.keys(words_wrong_history_totals).forEach(function(k){
			if(chosen_words.length < 4 && words_wrong_history_totals[k]!=0){
				chosen_words.push(k);
			}
		});

		print("chosen_words before random"); //del
		print(chosen_words); //del
	}

	while(chosen_words.length < 8){

		random_word_index = Math.floor(Math.random()*translations.length);
		while(chosen_words.includes(random_word_index)){
			random_word_index = Math.floor(Math.random()*translations.length);
		}

		chosen_words.push(translations[random_word_index]['id']);
		
	}

	print("chosen_words"); //del
	print(chosen_words); //del
	//Choosing words

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