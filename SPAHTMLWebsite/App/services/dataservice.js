define(['config','services/logger', 'durandal/system', 'services/model'],
    function (config,logger, system, model) {
      
        var getBookmarksPartials = function (bookmarksObservable) {
            // reset the observable
            bookmarksObservable([]);

            //amplify.request.define("getBookmarks", "ajax", {
            //    url: config.remoteServiceName,//"http://localhost:13763/api/bookmark",
            //    dataType: "json",
            //    type: "GET"
            //});
            
            //amplify.request({
            //    resourceId: "getTweets",
            //    data: { userName: "elijahmanor", count: 25 },
            //    success: function (data, status) {
            //        console.log(data, status);
            //    },
            //    error: function (data, status) {
            //        console.log(data, status)
            //    }
            //});
          
            //return amplify.request({
            //    resourceId: "getBookmarks",
            //    success: function(data, status) {
            //        var bookmarks = [];
            //        // data.sort(sortSpeakers);
            //        data.forEach(function (item) {
            //            var s = new model.BookmarksPartial(item);
            //            bookmarks.push(s);
            //        });
            //        bookmarksObservable(bookmarks);
            //        log('Retrieved bookmarks partials from remote data source' + status, bookmarks, true);
            //    },
            //    error: queryFailed
            //        }   
            //    );

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
                // data.sort(sortSpeakers);
                data.forEach(function (item) {
                    var s = new model.BookmarksPartial(item);
                    bookmarks.push(s);
                });
                bookmarksObservable(bookmarks);
                log('Retrieved bookmarks partials from remote data source',bookmarks,true);
            }
        };

        var getBookmarkById = function (id, bookmarkObservable) {

            //Configure amplify request. url to be defined in config
            amplify.request.define("getBookmarkById", "ajax", {
                url: config.remoteServiceName,
                dataType: "json",
                type: "GET"
            });
            
            return amplify.request({
                resourceId: "getBookmarkById",
                data: { id: id },
                success: function (data, status) {

                    var bookmarkItem = new model.Bookmark(data);
                    bookmarkObservable(bookmarkItem);
    
                        log('Retrieved bookmark item from remote data source' + status, bookmarkItem, true);
                    },
                    error: queryFailed
                }
                );
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
