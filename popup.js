var clientServices = 'https://clientservices.meditech.com/amsweb/TaskView.aspx?TaskNumber=';
var webtools = 'https://webtools.meditech.com/tasks/view?taskID=';
var jira = 'https://jira.meditech.com/browse/';
var dtsSystem = 'http://magicweb/dts/requests/';
var queryInfo = {active: true,
                 currentWindow: true};

chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

// Get selection from active tab
    chrome.tabs.sendMessage(tab.id, {method: "getSelection"},
    						function(response){
								var highlightText = response.data;
								highlightText = highlightText.trim().toUpperCase();

								// Parse what's higlighted if applicable
								if(highlightText.length > 0) {
									// CLIN JIRA
									if(/^[A-Za-z]{3,5}(?:-| )(?=[0-9]+)/.test(highlightText)) {
										highlightText = highlightText.replace(" ","-");
										chrome.tabs.create({url:jira.concat(highlightText),active: false});
									// DTSs
									} else if (/[a-zA-Z]{2,3} [a-zA-Z]{2,5} [0-9]+/.test(highlightText)) {
										highlightText = highlightText.replace(/ /g,"/").concat(".htm");
										chrome.tabs.create({url:dtsSystem.concat(highlightText),active: false});
									// Task Number
									} else if(/#?[0-9]{8}/.test(highlightText)  > -1) {
										if(highlightText.startsWith("#")) {
											highlightText = highlightText.substr(1,);
										}
										if(/(?:services)|(?:tools)\.meditech\.com/i.test(url)) {
											chrome.tabs.create({url:url.replace(/[0-9]{8}.*/,highlightText),active: false});
										}
										else {
											chrome.tabs.create({url:webtools.concat(highlightText),active: false});
										}
									}

								} else if (url.substring(0,68) == clientServices) {
							        chrome.tabs.update(tab.id, {url: webtools.concat(url.substr(68,8))});
							    } else if (url.substring(0,48) == webtools) {
							        chrome.tabs.update(tab.id, {url: clientServices.concat(url.substr(48,8))});
							    }
							});


});
setTimeout(function(){window.close();},50);