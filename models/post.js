const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
    image: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    published: { type: Boolean, required: true },
});

module.exports = mongoose.model('Post', PostSchema);
