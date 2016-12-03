var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  id: Number,
  name: String,
  platform: String,
  purpose: String,
  skills: [String],
  items_needed: [ String ],
  source: String,
  complete: Boolean

});
module.exports = mongoose.model('Project', ProjectSchema);