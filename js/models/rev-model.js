var app = app || {};

(function () {
    'use strict';

    app.RevModel = Backbone.Model.extend({

        defaults: {
            title: '',
            text: '',
            score: null
        }
    });
})();