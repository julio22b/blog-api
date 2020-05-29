const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: String, required: true },
    last_update: String,
    image: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    published: { type: Boolean, required: true },
});

PostSchema.virtual('url').get(function () {
    return `/api/post/${this.id}`;
});

module.exports = mongoose.model('Post', PostSchema);
