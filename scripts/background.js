"use strict";

var reloader = 0;
var censorMedia = [];
var blocklist = [];
var tabBlockingMap = {};
var blocked = 0;
var savedCode = "";


/* this function check the requests to any pages on the internet. if blocking is enabled,
** then this function will compare the url to any block url. if it is in the blocklist, then the request will be blocked.
*/ 

const  requestChecker = request => {
		if(blocked ==1){
			  if (request && request.url) {
				if (request.type == "main_frame" ||request.type == "xmlhttprequest") {
				  var tabBlockingState = 0;
				  for (var i = 0; i < censorMedia.length; ++i) {
					if (request.url.match(new RegExp(  ".*" + censorMedia[i] + ".*" , "i"))) {
					  tabBlockingState = censorMedia[i];
					}
				  }
				  /*
				  browser.tabs.getSelected(null, function(tab) {
					tabBlockingMap[tab.id] = tabBlockingState;
				  });
				  */
				  let querying = browser.tabs.query({active:true});
					function redirBlock(tab) {
					  tabBlockingMap[tab.id] = tabBlockingState;
					}
				  querying.then(redirBlock);
				  if (tabBlockingState != 0) {
					  console.log("there is blocking state");
					//var  redirectUrl = browser.runtime.getURL("http://www.linkedin.com");//("pages/blocked.html");
					var  redirectUrl = browser.runtime.getURL("./pages/blocked.html");
					console.log(redirectUrl);
					return { redirectUrl: redirectUrl};
				  }
				}
			  }
	}else if(blocked ==0){

	}

};

//update mapping
function updateMapping(details) {
		  if (typeof details.replacedTabId == "undefined") {
			if (!details.tabId in tabBlockingMap) {
			  tabBlockingMap[details.tabId] = 0;
			}
		  }
		  else {
			tabBlockingMap[details.tabId] = tabBlockingMap[details.replacedTabId];
			delete tabBlockingMap[details.replacedTabId];
		  }
}

//take all requests *//* etc and push them to the requestChecker
chrome.webRequest.onBeforeRequest.addListener( requestChecker, {urls: ["*://*/*"]}, ["blocking"]);

// update mapping if replaced
browser.webNavigation.onTabReplaced.addListener(updateMapping);
browser.webNavigation.onCommitted.addListener(updateMapping);
					
// receive message to block and toggle blocked to 1, to 0 if message means to unblock.					
function updateBlockMedia(message){
	if("blockMedia" in message){
		console.log("blocking");
		blocked =1;
	}else if("unblockMedia" in message){
		console.log("not blocking");
		blocked =0;
	}
}
// listen to incoming messages from popup.js (if user click on block/unblock)
browser.runtime.onMessage.addListener(updateBlockMedia);


// read subscription code and weekblockState from local memory and act depending on these states.
browser.storage.local.get(null, result => {
	console.dir(result);
			if(typeof result.censorMedia != "undefined"){
				censorMedia = result.censorMedia;
			}
			const currentT = Date.now();
			if (typeof result.blockUntil != "undefined"){
				if (currentT < result.blockUntil){
					blocked =1;			
				}else{//set blockuntil or blocked to zero ??? 
					if(typeof result.isMediaBlocking != "undefined"){
						blocked =result.isMediaBlocking;
					}					
				}			
			}else{
					if(typeof result.isMediaBlocking != "undefined"){
						blocked =result.isMediaBlocking;
					}				
			}
			if(typeof result.blocklist != "undefined"){//get blocklist from storage
				blocklist = result.blocklist;
				console.log(blocklist);
				//censorMedia = censorMedia.concat(blocklist);
			}
			if(typeof result.savedCode != "undefined"){
				if(typeof result.censorMedia != "undefined"){
					censorMedia = result.censorMedia;
				}
				savedCode =result.savedCode;
				console.log(savedCode);
				//getAllUrls(savedCode);
			}
});

//listens to storage censorMedia item changes and update current variable block list censorMedia accordingly.
browser.storage.onChanged.addListener(function(changes) {
	if(typeof changes != "undefined"){
			if(typeof changes.censorMedia != "undefined"){
				if(typeof changes.censorMedia.newValue != "undefined"){
					censorMedia = changes.censorMedia.newValue;
				}
			}
	}
});

let handler = undefined;
//update handling of requests state depending on the actions of user in popup.js (the "messages" from sent by popup.js to background.js)
function updateBlocking(message){
		if("blockImages" in message){
						
							 console.log("blocking");
				const settings = {
					pattern: "<all_urls>",
					isBlocking: true,
					isReloadingOnToggle: false,

					ui: {
						windowDetails: {
							title: "Images are allowed",
						},
						icon: {
							path: "icons/image_allowed.svg",
						},
					},
				};
				 const blockingHandler = requestDetails => {
					return {
						cancel: settings.isBlocking
					};
				 };
				
				handler = blockingHandler;
				browser.webRequest.onBeforeRequest.addListener(
					handler,
					{
						urls: [
							settings.pattern
						],
						types: [
							"image"
						]
					},
					[
						"blocking"
					]
				);	
				if(typeof browser.tabs.reload() != "undefined"){
					browser.tabs.reload().then(
								() => console.debug("Current page reloaded..."),
								e => console.error(e)
						);
				}
				
		}else if("unblockImages" in message){
			 console.log("try unblocking");
			if (handler) {
				browser.webRequest.onBeforeRequest.removeListener(handler);
			}
			browser.tabs.reload().then(
					() => console.debug("Current page reloaded..."),
					e => console.error(e)
			);
		}
}
// lsiten to messages from popup.js
browser.runtime.onMessage.addListener(updateBlocking);