define(['config','services/logger', 'durandal/system', 'services/model'],
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
                url: 'http://localhost:13763/rest/bookmark/',
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

        var dataservice = {
            getBookmarksPartials: getBookmarksPartials,
            getBookmarkById: getBookmarkById
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
