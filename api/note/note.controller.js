'use strict';

var _ = require('lodash')
    , Note = require('./note.model');

exports.index = function(req, res) {
    var search = req.query.query;
    var query = Note.find();

    if (search) {
        query = Note.find({ $text: { $search: search } }, { score : { $meta: "textScore" } })
            .sort({ score : { $meta : 'textScore' } });
    }

    query.exec(function (err, notes) {
        if(err) { return handleError(res, err); }
        return res.json(200, notes);
    });
};

exports.show = function(req, res) {
    Note.findById(req.params.id, function (err, note) {
        if(err) { return handleError(res, err); }
        if(!note) { return res.send(404); }
        return res.json(note);
    });
};

exports.create = function(req, res) {
    Note.create(req.body, function(err, note) {
        if(err) { return handleError(res, err); }
        return res.json(201, note);
    });
};

exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Note.findById(req.params.id, function (err, note) {
        if (err) { return handleError(res, err); }
        if(!note) { return res.send(404); }
        var updated = _.merge(note, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, note);
        });
    });
};

exports.destroy = function(req, res) {
    Note.findById(req.params.id, function (err, note) {
        if(err) { return handleError(res, err); }
        if(!note) { return res.send(404); }
        note.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
