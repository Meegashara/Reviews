var application_root = __dirname,
    express = require( 'express' ),
    bodyParser = require('body-parser'),
    //path = require( 'path' ),
    mongoose = require( 'mongoose' );

    var app = express();

    app.use(express.static(application_root));
    app.use(bodyParser());

    var port = 3000;

    app.listen( port, function() {
        console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
    });

    mongoose.connect('mongodb://localhost/review_database');

    var ReviewSchema = new mongoose.Schema({
        title: String,
        text: String,
        score: Number
    });

    var ReviewModel = mongoose.model('Check', ReviewSchema);

    app.get('/api/review', function (req, res) {
        return ReviewModel.find(function (err, reviews) {
            if(!err)
                return res.send(reviews);
            else
                return console.log(err);
        });
    });

    app.post('/api/review', function (req, res) {
        var review = new ReviewModel({
            title: req.body.title,
            text: req.body.text,
            score: req.body.score
        });
        review.save(function (err) {
            if(!err)
                return console.log('Review created');
            else
                return console.log(err);
        });
        return res.send(review);
    });

    app.get('/api/review/:id', function (req, res) {
        return ReviewModel.findById(req.params.id, function (err, review) {
            if(!err)
                return res.send(review);
            else
                return console.log(err);
        });
    });

    app.put('/api/review/:id', function (req, res) {
        console.log('Updating review' + req.body.title);
        return ReviewModel.findById(req.params.id, function (err, review) {
            review.title = req.body.title;
            review.text = req.body.text;
            review.score = req.body.score;
            return review.save(function (err) {
                if(!err) {
                    console.log('Review updated');
                    return res.send(review);
                }
                else
                    console.log(err);
            });
        });
    });

    app.delete('/api/review/:id', function (req, res) {
        console.log('Deleting review with id: ' + req.params.id);
        return ReviewModel.findById(req.params.id, function (err, review) {
            return review.remove(function (err) {
                if(!err) {
                    console.log('Review removed');
                    return res.send('');
                } else
                    console.log(err);
            });
        });
    });
