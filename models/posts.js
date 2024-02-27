const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: {type: Schema.Types.ObjectId, ref: "Users", required: true},
    title: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now},
});

postSchema.virtual("url").get(function (){
    return `/posts/${this._id}`;
});

postSchema.virtual("date_formatted").get(function(){
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED)
});

module.exports = mongoose.model("Posts", postSchema);