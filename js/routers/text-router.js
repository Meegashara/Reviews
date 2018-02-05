var app = app || {};

(function () {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            "*id" : "order"
        },
        
        order: function (text) {
            jQuery.get(text, function (data) {
                $('.text-text').html(data.text);
            });
        }
    });

    app.AppRouter = new AppRouter();
    Backbone.history.start();
})();