var clientServices = 'https://clientservices.meditech.com/amsweb/TaskView.aspx?TaskNumber=';
var webtools = 'https://webtools.meditech.com/tasks/view?taskID=';
var queryInfo = {active: true,
                 currentWindow: true};

chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    if (url.substring(0,68) == clientServices) {
        chrome.tabs.update(tab.id, {url:webtools.concat(url.substr(68,8))});
    } else if (url.substring(0,48) == webtools) {
        chrome.tabs.update(tab.id, {url:clientServices.concat(url.substr(48,8))});
    }
});
window.close();