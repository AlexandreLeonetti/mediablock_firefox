maxInterval = 0 ;

var censor = [];

browser.storage.local.get(null, result => {
		  if(typeof result.censor != "undefined" ){
			  censor = result.censor ;
		  }  
});
console.log(window.location.href );

browser.storage.local.get(null, result => {
						if (typeof result.isImagesBlocking != 'undefined')	{
							if (result.isImagesBlocking == 1)	{
							var eliminator = setInterval(()=>{
								
							  var imgs = document.querySelectorAll('img').forEach(function(img){
									img.style.display='none';
							   });
							   

							   
							   
							   	var strongvs = document.querySelectorAll('video').forEach(function(div){
										div.setAttribute('style', 'background-color:white !important; opacity:0; color:white !important;');
							   });								   
							   maxInterval++;
							   //console.log(imgs);
							   if(maxInterval>30){
								   clearInterval(eliminator);
							   }
							},200);
							
							console.log("isImagesBlocking ");
							console.log(result.isImagesBlocking);
							}else{}
						}else{
							
							console.log("storage array has been set");
						}				
});


browser.storage.local.get(null, result => {//
						if (typeof result.isKeywordBlocking != 'undefined')	{
							if (result.isKeywordBlocking == 1)	{
								var eliminator = setInterval(()=>{
								
								//KEYWORDS
								  var dvs = document.querySelectorAll('div').forEach(function(div){
								  var strDiv = div.innerText;
								  var count = div.childElementCount; 
						  
									if(count==0){
										 for(var i=0; i<censor.length; i++){
											if(strDiv.includes(censor[i])){

												
												console.log(count);
												console.log(strDiv);
													div.setAttribute('style', 'opacity:1 !important;background-color:white !important;color:white !important; ');//background-color:red !important; 
												
													
												}else{	
												}
										 }
									 }
									 
									 
								   });							   
								    
									var avs = document.querySelectorAll('a').forEach(function(div){
									var strDiv = div.innerText;
									
									for(var i=0; i<censor.length; i++){
										if(strDiv.includes(censor[i])){
											//console.log(div);
											div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
											}else{	
											}
									 }
								   });	
									var bbb = document.querySelectorAll('b').forEach(function(div){
									var strDiv = div.innerText;
									
									for(var i=0; i<censor.length; i++){
										if(strDiv.includes(censor[i])){
											//console.log(div);
											div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
											}else{	
											}
									 }
								   });	
								  
								  
								  	var spanDel = document.querySelectorAll('span').forEach(function(div){
									var strDiv = div.innerText;
									
									for(var i=0; i<censor.length; i++){
										if(strDiv.includes(censor[i])){
											//console.log(div);
											div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
											}else{	
											}
									 }
								   });	
								  
								  

								   
								  
								   	var em = document.querySelectorAll('em').forEach(function(div){
									var strDiv = div.innerText;
									  
									 for(var i=0; i<censor.length; i++){
										if(strDiv.includes(censor[i])){
											//console.log(strDiv);
											div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
											}else{	
											}
									 }
								   });									   
									var strongvs = document.querySelectorAll('strong').forEach(function(div){
									var strDiv = div.innerText;
									 for(var i=0; i<censor.length; i++){
										if(strDiv.includes(censor[i])){
											div.setAttribute('style', 'background-color:red !important; opacity:0 !important;color:red !important;');
										}else{	
										}
									 }
								   });	// CENSOR KEYWORDS	
								   
								   	var h1 = document.querySelectorAll('h1').forEach(function(div){
									var strDiv = div.innerText;
									  
									 for(var i=0; i<censor.length; i++){
										if(strDiv.includes(censor[i])){
											//console.log(strDiv);
											div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
											}else{	
											}
									 }
								   });									   
								   	var h2 = document.querySelectorAll('h2').forEach(function(div){
									var strDiv = div.innerText;
									  
									 for(var i=0; i<censor.length; i++){
										if(strDiv.includes(censor[i])){
											//console.log(strDiv);
											div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
											}else{	
											}
									 }
								   });
								   	var h3 = document.querySelectorAll('h3').forEach(function(div){
									var strDiv = div.innerText;
									  
									 for(var i=0; i<censor.length; i++){
										if(strDiv.includes(censor[i])){
											//console.log(strDiv);
											div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
											}else{	
											}
									 }
								   });								   
								   	var h4 = document.querySelectorAll('h4').forEach(function(div){
									var strDiv = div.innerText;
									  
									 for(var i=0; i<censor.length; i++){
										if(strDiv.includes(censor[i])){
											//console.log(strDiv);
											div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
											}else{	
											}
									 }
								   });				
									
								},200);
							}
						}
});					