define(['durandal/app', 'services/dataservice', 'durandal/plugins/router'],
    function (app, dataservice, router) {
        var isSaving = ko.observable(false),
            
            bookmark = ko.observable(),
            
            activate = function () {
                bookmark(dataservice.createClient());
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            hasChanges = ko.computed(function () {
                return dataservice.hasChanges();
            }),
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving();
            }),
            save = function () {
                isSaving(true);
                dataservice.saveChanges()
                    .then(goToEditView).fin(complete);

                function goToEditView(result) {
                    router.replaceLocation('#/bookmarkdetail/' + bookmark().id());
                }

                function complete() {
                    isSaving(false);
                }
            },
            canDeactivate = function () {
                if (hasChanges()) {
                    var msg = 'Do you want to leave and cancel?';
                    return app.showMessage(msg, 'Navigate Away', ['Yes', 'No'])
                        .then(function (selectedOption) {
                            if (selectedOption === 'Yes') {
                                dataservice.cancelChanges();
                            }
                            return selectedOption;
                        });
                }
                return true;
            };

        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            bookmark:bookmark,
            title: 'Add a New Bookmark'
           
        };

        return vm;
    });