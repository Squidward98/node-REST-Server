const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: { type: String, unique: true, required: [true, 'Name required.'] },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Category', categorySchema);