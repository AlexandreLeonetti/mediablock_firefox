
document.querySelectorAll('button').forEach(item => item.addEventListener('click', saveCode));


function saveCode (){
	var mediaCode = 	document.getElementById("mediaCode");
	browser.storage.local.set({"savedCode":mediaCode.value});
}







