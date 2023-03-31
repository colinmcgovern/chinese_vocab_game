
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

translations = new Array();
$.getJSON('https://raw.githubusercontent.com/clem109/hsk-vocabulary/master/hsk-vocab-json/hsk-level-'+$_GET['level']+'.json', function (data) {

	translations = data;
	console.log(translations)

	words_wrong = JSON.parse(Cookies.get('words_wrong'))
	words_correct = JSON.parse(Cookies.get('words_correct'))

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

	console.log(words_wrong)

	var wrong_string = ""
	words_wrong.forEach(x =>
		wrong_string = wrong_string + 
		id_type_to_text(Number(x),'hanzi') + " " + 
		id_type_to_text(Number(x),'pinyin') + " " +
		id_type_to_text(Number(x),'translations') + "<br>"
	)

	var correct_string = ""
	words_correct.forEach(x =>
		wrong_string = wrong_string + 
		id_type_to_text(x,'hanzi') + " " + 
		id_type_to_text(x,'pinyin') + " " +
		id_type_to_text(x,'translations') + "<br>"
	)


	$("#dis_words_wrong").text(wrong_string);
	$("#dis_words_correct").text(correct_string);

}).error(function(){
	console.log('error: json not loaded');
});