
function selectLang()
{

var lang = document.getElementById("lang_opt");
theIndx=lang.selectedIndex;
lang_id=lang.options[theIndx].value;
if(lang_id=="0")
	{
		alert("Select Language");
		return;
	}
var lno=parseFloat(lang_id);
$('#corpus_opt').load('CLExperiment4-0.php?ind='+lno);
}


function selectSize()
{
var tokens = document.getElementById("corp_size");
theIndx=tokens.selectedIndex;
tok_id=tokens.options[theIndx].value;
id=tok_id.split("*");

if(tok_id=="-1")
	{
		alert("Select the number of tokens");
		return;
	}
var tno=parseFloat(id[1]);
var lno=parseFloat(id[0]);
$('#display').load('CLExperiment4-2.php?ind='+tno+'&lang='+lno);

}


function selectSize()
{
var tokens = document.getElementById("corp_size");
theIndx=tokens.selectedIndex;
tok_id=tokens.options[theIndx].value;
alert(tok_id);
id=tok_id.split("*");

if(tok_id=="-1")
	{
		alert("Select the number of tokens");
		return;
	}
var tno=parseFloat(id[2]);
var cno=parseFloat(id[1]);
var lno=parseFloat(id[0]);

$('#display').load('CLExperiment4-2.php?ind='+tno+'&corp='+cno+'&lang='+lno);

}
