var app = app || {};

(function ($) {
    'use strict';

    app.RevView = Backbone.View.extend({

        el: '.root',

        events: {
            'click .add': 'createReview',
            'click .like': 'addLike'
        },

        initialize: function () {
            this.$input = this.$('.new-review');
            this.$textarea = this.$('.text-review');
            this.$list = this.$('.review-all');
            this.$home = this.$('.home-review-all');
            this.$text = this.$('.text-text');
            this.$like = this.$('.like-num');

            this.listenTo(app.revCollection, 'change', this.addOneRev);
            this.listenTo(app.revCollection, 'change', this.addHomeRev);
            this.listenTo(app.revCollection, 'reset', this.addAllRev);

            app.revCollection.fetch({reset: true});
        },

        render: function () {
        },

        addOneRev: function (rev) {
            var view = new app.HistView({model: rev});
            this.$list.prepend(view.render().el);
        },

        addHomeRev: function (home) {
            var home_view = new app.HomeView({model: home});
            this.$home.prepend(home_view.render().el);
        },

        addAllRev: function () {
            this.$list.html('');
            app.revCollection.each(this.addOneRev, this);
            app.revCollection.each(this.addHomeRev, this);
        },

        newAttributes: function () {
            return {
                title: this.$input.val().trim(),
                text: this.$textarea.val().trim()
            };
        },

        createReview: function () {
            if(this.$input.val().trim() && this.$textarea.val().trim()) {
                app.revCollection.create(this.newAttributes());
                this.$input.val('');
                this.$textarea.val('');
            }
        },

        newLike: function() {
            return {
                text: this.$like.val()
            };
        },

        addLike: function() {
            var url = window.location.href.split('/');
            
            var put = this.$like.val();
            if (put >= 0 && put <= 10) {

                jQuery.get(url[4] + '/' + url[5] + '/' + url[6], function (data) {
                jQuery.ajax({
                    url: url[4] + '/' + url[5] + '/' + url[6],
                    type: 'PUT',
                    data: {
                        title: data.title,
                        text: data.text,
                        score: put
                    }
                })
            });
                this.$like.val('');
            } else {
                alert("Нужно ввести от 0 до 10!");
            }
        }
    });
})(jQuery);
