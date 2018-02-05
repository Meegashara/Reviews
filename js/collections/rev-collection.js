var app = app || {};

(function () {
    'use strict';

    var RevCollection = Backbone.Collection.extend({

        model: app.RevModel,
        url: '/api/review'

    });

    app.revCollection = new RevCollection();

})();
