function getOption(lang){
	if(lang=="null")
	{
		alert("Select language");
		return;
	}
	$('#words_sentence').load('CLexp2.php?lang='+lang+'&words_selected=%&words=%&possible_sent=%&turn=0&position=%');
}
