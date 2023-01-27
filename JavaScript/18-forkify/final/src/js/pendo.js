document.getElementById("pendo-g-n0-dnsehFYn6CaoLsgJ5mKR0YpQ").style.display="none";
}

var pedoIDTag, pendoAttribute, guideInfo;
pedoIDTag = document.getElementById('pendo-tagging');
if (pedoIDTag) {
pendoAttribute = pedoIDTag.getAttribute('data-pendo-page-id');
} else {
console.log('Error: Unable to get Pendo tag ID')
}
function getMetricInfo() {
var elem, parentId, metricName, doaminName, customMetricName, txt;
elem = document.getElementById("detailPage")
parentId = elem.getAttribute("data-metric-parent-id");
metricName = elem.getAttribute("data-metric-name");
doaminName = elem.getAttribute("data-metric-domain");
customMetricName = elem.getAttribute("data-metric-custom-metric-name");
txt = '';
txt += "\nParent ID: " + parentId + "\n Metric Name: " + metricName + " \n Domain Name: " + doaminName + "\n Cutom metric:" + customMetricName ;
return txt;
}

function getSettingCard() {
    const elem = document.getElementById('setting');
    const pageId = elem.getAttribute("data-metric-parent-id");
    const card = elem.getAttribute("data-metric-name");
    return `\nParent ID: "${pageId}\nCard Name: "${card}"`;
}


function getStoryboardsInfo() {
return 'Storyboard: Ageing'
}
function getGuideInfo() {
if (pendoAttribute) {
switch (pendoAttribute) {
case 'metrics':
guideInfo = getMetricInfo();
break;
case 'storyBoards':
guideInfo = getStoryboardsInfo();
break;
case 'settings':
guideInfo = getSettingCard();
break;
}
}
return guideInfo;
}
var url = window.location.href;
var info = getGuideInfo();

document.getElementById("pendo-textarea-44581a7d").value= url + info; document.getElementById("pendo-button-889ff677").click() 