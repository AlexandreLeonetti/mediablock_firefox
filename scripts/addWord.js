'use strict';

// ----------------- Internationalization ------------------
/*
document.querySelectorAll('[data-i18n]').forEach(node => {
  let [text, attr] = node.dataset.i18n.split('|');
  text = browser.i18n.getMessage(text);
  attr ? node[attr] = text : node.appendChild(document.createTextNode(text));
});*/
// ----------------- /Internationalization -----------------

// ----- global

var MediaArray = [];
var keywordArray  = [];
var premium = false;

/*
** Getting keyword array, media array and premium status from browser storage.
*/

browser.storage.local.get(null, result => {
		  if(typeof result.censor != "undefined" ){
			  keywordArray = result.censor ;
		  }
			if(typeof result.censorMedia != "undefined"){// result.censorMedia
				MediaArray = result.censorMedia;// result.censorMedia 
			}
			if(typeof result.premium != "undefined" ){
			  premium = result.premium ;
			  console.log("premium");
		  }
});


/*
** Injecting entered values in , newKeyword and newMedia.
*/


const newKeyword =  document.querySelector('#wordAddress');
const newMedia =  document.querySelector('#mediaAddress');

// Add Listeners for each click on a button.

document.querySelectorAll('button').forEach(item => item.addEventListener('click', process));


/*
** The function process(), take care of each entry and call the function that is relevent to each case.
*/

function process() {
  switch (this.dataset.i18n) {
    case 'cancel':
       location.href = '/keyWords.html';
      break;
    case 'saveKeyword':
      if (!validateInput()) { return; }
      browser.storage.local.set(makeword(), () => {
        location.href = '/keyWords.html' ;
      });
      break;
	 case 'saveMedia':
      if (!validateMedia()) { return; }
      browser.storage.local.set(makeMedia(), () => {
        location.href = '/keyWords.html' ;
      });
      break;
	  case 'weekBlock':
      browser.storage.local.set(blockForOneWeek(), () => {
        location.href = '/keyWords.html' ;
      });
      break;
	  case 'weekU':
      browser.storage.local.set(Ublock(), () => {
        location.href = '/keyWords.html' ;
      });
      break;	  
  }
}



// cleans entered keyword if incorrect char.
function validateInput() {
  document.querySelectorAll('input[type="text"]').forEach(item => item.value = item.value.trim());  
  newKeyword.value = Utils.stripBadChars(newKeyword.value);  
  newKeyword.classList.remove('invalid'); // reset
  if (!newKeyword.value) {
    newKeyword.classList.add('invalid');
    return false;
  }
  return true;
}

// cleans entered website address if incorrect char.
function validateMedia() {
  document.querySelectorAll('input[type="text"]').forEach(item => item.value = item.value.trim());  
  newMedia.value = Utils.stripBadChars(newMedia.value);  
  newMedia.classList.remove('invalid'); // reset
  if (!newMedia.value) {
    newMedia.classList.add('invalid');
    return false;
  }
  return true;
}

// send message "blockmedia" and return blocking deadline into object "blockUntil"
function blockForOneWeek() {
	const start = Date.now();
	//var blockUntilMS = 604800000+start;// one week 
	var blockUntilMS = 604800000+start;// 60000 one min. this functionality likely  works but need live test.
	browser.runtime.sendMessage({"blockMedia": "blockMedia"});	
	return {"blockUntil":blockUntilMS};
}

// returns current date and set "blockUntil" to this current date, hence unblocking immediately.
function Ublock() {
	const start = Date.now();
	var blockUntilMS = start;
	return {"blockUntil":blockUntilMS};
}



// push keyword entered and return the object "censor": "the pushed new array".
function makeword() {
   keywordArray.push(newKeyword.value);
  return {["censor"]: keywordArray};
}
//push  website address and return the object "censormedia" : "the pushed new array"
function makeMedia() {
	var newMediaCompleted = newMedia.value;//"*://www."+ newMedia.value+"/*";
   MediaArray.push(newMediaCompleted);
  return {["censorMedia"]: MediaArray};//"censorMedia"
}

