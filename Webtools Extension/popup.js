var clientServices = 'https://clientservices.meditech.com/amsweb/TaskView.aspx?TaskNumber=';
var webtools = 'https://webtools.meditech.com/tasks/view?taskID=';
var jira = 'https://jira.meditech.com/browse/';
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
								highlightText = highlightText.trim()
								// Parse what's higlighted if applicable
								if(highlightText.length > 0) {
									if(highlightText.search(/CLIN-(?=[0-9]{4,5})/)  > -1) {
										chrome.tabs.create({url:jira.concat(highlightText),active: false});
									} else if(highlightText.search(/[0-9]{8}/)  > -1) {
										chrome.tabs.create({url:tab.url.replace(/[0-9]{8}.*/,highlightText),active: false});
									}

								} else if (url.substring(0,68) == clientServices) {
							        chrome.tabs.update(tab.id, {url: webtools.concat(url.substr(68,8))});
							    } else if (url.substring(0,48) == webtools) {
							        chrome.tabs.update(tab.id, {url: clientServices.concat(url.substr(48,8))});
							    }
							});


});
setTimeout(function(){window.close();},50);
