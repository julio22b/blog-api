const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    username: { type: String },
    text: { type: String, required: true, minlength: 1 },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    timestamp: { type: String, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
