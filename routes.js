'use strict';

module.exports = function(app) {
    app.use('/api/notes', require('./api/note/index'));

    app.route('/*')
        .get(function(req, res) {
            res.json({ message: 'Notes API!' });
        });
};
