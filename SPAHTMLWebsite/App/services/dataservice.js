﻿define(['config','services/logger', 'durandal/system', 'services/model'],
    function (config,logger, system, model) {
      
        var getBookmarksPartials = function (bookmarksObservable) {
            // reset the observable
            bookmarksObservable([]);

            // set ajax call
            var options = {
                url: config.remoteServiceName,
                type: 'GET',
                dataType: 'json'
            };

            // make call
            return $.ajax(options)
                .then(querySucceeded)
                .fail(queryFailed);

            // handle the callback
            function querySucceeded(data) {
                var bookmarks = [];

                if (config.isJavaWebService) {
                    var list = data.bookmark == null ? [] : (data.bookmark instanceof Array ? data.bookmark : [data.bookmark]);
                    $.each(list, function (index, item) {
                        var s = new model.BookmarksPartial(item);
                        bookmarks.push(s);
                    });
                } else {
                    
                    data.forEach(function (item) {
                        var s = new model.BookmarksPartial(item);
                        bookmarks.push(s);
                    });
                }
                
                bookmarksObservable(bookmarks);
                log('Retrieved bookmarks partials from remote data source',bookmarks,true);
            }
        };

        var getBookmarkById = function (id, bookmarkObservable) {
            //var bookmark;
            // set ajax call
            var options = {
                url: config.remoteServiceName,//'http://localhost:13763/rest/bookmark/',
                data: { id: id },
                type: 'GET',
                dataType: 'json'
            };

            // make call
            return $.ajax(options)
                .then(querySucceeded)
                .fail(queryFailed);

            // handle the callback
            function querySucceeded(data) {
               
                var bookmarkItem = new model.Bookmark(data);
                    bookmarkObservable(bookmarkItem);
            
                log('Retrieved bookmark item from remote data source', bookmarkItem, true);
            }
        };

        var updateBookmark = function (bookmarkObservable) {

            var unmappedBookmark = ko.toJS(bookmarkObservable);

            return $.ajax({
                type: 'PUT',
                contentType: 'application/json',
                url: config.remoteServiceName + unmappedBookmark.id,
                dataType: "json",
                data: JSON.stringify({ "id": unmappedBookmark.id, "title": unmappedBookmark.title, "url": unmappedBookmark.url, "description": unmappedBookmark.description })
                }).done(function(data) {
                    log('Successfully added bookmark with remote data source', data, true);
                }
                ).fail(queryFailed);
    

            //function queryFailed(jqXHR, textStatus) {
                //var msg = 'Error getting data. ' + textStatus;
                //logger.log(msg,
                //    jqXHR,
                //    system.getModuleId(dataservice),
                //    true);
            //}

            // set ajax call
            //var options = {
            //    type: 'PUT',
            //    contentType: 'application/json',
            //    url: config.remoteServiceName,
            //    dataType: 'json',
            //    data: JSON.stringify({ "id": unmappedBookmark.id, "title": unmappedBookmark.title, "url": unmappedBookmark.url, "description": unmappedBookmark.description })
            //    //data: JSON.stringify({ "id": bookmarkObservable.id, "title": bookmarkObservable.title, "url": bookmarkObservable.url, "description": bookmarkObservable.description })
            //};

            //// make call
            //return $.ajax(options)
            //    .then(querySucceeded)
            //    .fail(queryFailed);

            function querySucceeded(data, textStatus, jqXHR) {
                log('Successfully updated bookmark with remote data source' + textStatus, data, true);
            }
        };

        var addBookmark = function (unmappedBookmark) {

            return $.Deferred(function (deferredObject) {
                
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: config.remoteServiceName,
                    dataType: "json",
                    data: JSON.stringify({ "title": unmappedBookmark.title, "url": unmappedBookmark.url, "description": unmappedBookmark.description })
                    //Ajax promises
                }).done(function (data) {

                    log('Successfully added bookmark with remote data source', data, true);
                    deferredObject.resolve(data);
                }
                ).fail(function (jqXHR, textStatus) {

                    queryFailed(jqXHR, textStatus);
                    deferredObject.reject();
                }
                );

            }
            ).promise();
            
            
            
            
            //// set ajax call
            //var options = {
            //    url: config.remoteServiceName,
            //    type: 'POST',
            //    dataType: 'json',
            //    data: JSON.stringify({ "title": unmappedBookmark.title, "url": unmappedBookmark.url, "description": unmappedBookmark.description })
            //};

            //// make call
            //return $.ajax(options)
            //    .then(querySucceeded)
            //    .fail(queryFailed);

            //function querySucceeded(data, textStatus, jqXHR) {
            //    log('Successfully added bookmark with remote data source' + textStatus, data, true);
            //}
        };
        
        var dataservice = {
            getBookmarksPartials: getBookmarksPartials,
            getBookmarkById: getBookmarkById,
            addBookmark: addBookmark,
            updateBookmark: updateBookmark
        };
        return dataservice;

        //#region Internal methods
        //function sortSpeakers(s1, s2) {
        //    return (s1.firstName + s1.lastName > s2.firstName + s2.lastName)
        //        ? 1 : -1;
        //}

        function queryFailed(jqXHR, textStatus) {
            var msg = 'Error getting data. ' + textStatus;
            logger.log(msg,
                jqXHR,
                system.getModuleId(dataservice),
                true);
        }

        function log(msg, data, showToast) {
            logger.log(msg,
                data,
                system.getModuleId(dataservice),
                showToast);
        }
        //#endregion

    });

//------------------------------------
// Traditional Ajax call
//------------------------------------

// set ajax call
//var options = {
//    url: 'http://localhost:13763/api/bookmark',
//    type: 'GET',
//    dataType: 'json'
//};

// make call
//return $.ajax(options)
//    .then(querySucceeded)
//    .fail(queryFailed);
