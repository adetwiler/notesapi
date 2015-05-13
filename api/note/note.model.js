var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var NoteSchema = new Schema({
    body: { type: String, required: true }
});

NoteSchema.index({ body: 'text' });

module.exports = mongoose.model('Note', NoteSchema);
