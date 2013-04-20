
var remoteServiceName = 'http://localhost:13763/rest/bookmark/';
// get the currently selected text
var desc;
try {
    desc= ((window.getSelection && window.getSelection()) ||
(document.getSelection && document.getSelection()) ||
(document.selection &&
document.selection.createRange &&
document.selection.createRange().text));
}
catch(e){ // access denied on https sites
    desc = "";
}

//var url= encodeURIComponent(location.href);
//var title= encodeURIComponent(document.title);

var url = location.href;
var title = document.title;
var description = desc.toString() || "none specified";

  //$.Deferred(function (deferredObject) {

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: remoteServiceName,
            dataType: "json",
            data: JSON.stringify({ "title": title, "url": url, "description": description })
            //Ajax promises
        }).done(function (data) {
           // deferredObject.resolve(data);
        }
        ).fail(function (jqXHR, textStatus) {
            alert('Error adding bookmark! ' + textStatus);
            //deferredObject.reject();
        }
        );
    //}
    //).promise();