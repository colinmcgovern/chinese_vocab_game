var words_correct = new Array();
if(Cookies.get('words_correct') != null){
	words_correct = JSON.parse(Cookies.get('words_correct'));
}

var words_wrong = new Array();
if(Cookies.get('words_wrong') != null){
	words_wrong = JSON.parse(Cookies.get('words_wrong'));
}

words_correct.forEach( item => {
	console.log(item);  
});

words_wrong.forEach( item => {
	console.log(item);  
});