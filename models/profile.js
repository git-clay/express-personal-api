var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
var PetSchema = new Schema({
	name:String,
	type: String,
	breed: String
});

var ProfileSchema = new Schema({
  name: String,
  github_link: String,
  github_profile_image: String,
  current_city: String,
  pets: [PetSchema]

});



module.exports = mongoose.model('Profile', ProfileSchema);