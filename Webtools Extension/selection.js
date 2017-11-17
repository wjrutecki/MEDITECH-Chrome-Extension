chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
											if (request.method == "getSelection") {
												console.log(window.getSelection().toString().length);
												sendResponse({data: window.getSelection().toString()});
											}
											else {
												console.log("yo");
											    sendResponse({}); // snub them.
											}
									   });