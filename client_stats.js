var words_wrong_string = "";
var words_correct_string = "";

var words_wrong = new Array();
var words_correct = new Array();

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