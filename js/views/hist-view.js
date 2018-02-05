var app = app || {};

(function ($) {
    'use strict';

    app.HistView = Backbone.View.extend({

        tagName: 'li',

        template: _.template( $('#item-template').html() ),

        events: {
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function() {
            if (this.model.changed.id !== undefined) {
                return;
            }

            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(jQuery);