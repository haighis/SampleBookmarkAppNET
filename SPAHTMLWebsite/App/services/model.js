define(['config', 'durandal/system', 'services/logger'],
    function (config, system, logger) {
    
    var BookmarksPartial = function (dto) {
        // Map to observables and add computeds
        return mapToObservable(dto);
    };

    var Bookmark = function (dto) {
        return mapToObservable(dto);
        //var self = this;
        //self.id = ko.observable();
        //self.title = ko.observable();
        //self.url = ko.observable();
        //self.description = ko.observable();
        //return self;
    };

    var model =
    {
        BookmarksPartial: BookmarksPartial,
        Bookmark: Bookmark
    };

    return model;

    //#region Internal Methods
    function mapToObservable(dto) {
        var mapped = {};
        for (prop in dto) {
            if (dto.hasOwnProperty(prop)) {
                mapped[prop] = ko.observable(dto[prop]);
            }
        }
        return mapped;
    };

    //function addSpeakerPartialComputeds(entity) {
    //    entity.fullName = ko.computed(function () {
    //        return entity.firstName() + ' '
    //            + entity.lastName();
    //    });
    //    entity.imageName = ko.computed(function () {
    //        return makeImageName(entity.imageSource());
    //    });
    //    return entity;
    //};
        
    function log(msg, data, showToast) {
        logger.log(msg, data, system.getModuleId(model), showToast);
    }
    //#endregion
});