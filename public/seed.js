// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var mongoose = require('mongoose');
var db = require('./models');


var new_profile = new db.Profile ({name:"Clay Smith",
github_link:"http://www.gihub.com/git-clay",
github_profile_image:"http://www.github.com/git-clay/image",
current_city:"Denver,CO",
pets:	[{name:"Archer",  // object Object
		type:"Dog",
		breed:"Lab/Basset"
		}]

});

var project_list = [{
	id: 1,
	name: "Dog treat dispenser",
	platform: "Raspberry Pi",
	purpose: "Interactive dog toy - IOT",
	skills: ["Raspberry Pi", "Node Server", "Soldering", "3d Print modeling", "micro controller sensors"],
	items_needed: ["Raspberry Pi", "3D printed dispenser","breadboard", "powercord","WIFI"],
	source: "http://www.nyccnc.com/judd-treat-machine.html",
	complete: false
},{
	id: 2,
	name: "Body Comp Device",
	platform: "Arduino",
	purpose: "Better way to measure body composition",
	skills: ["Arduino", "sensor input", "Soldering", "3d Print modeling", "algorithm creation"],
	items_needed: ["Arduino", "sensor","wires", "laptop","Eventually bluetooth module"],
	complete: false
},{
	id:4,
	name: "extra for testing"
}];

//make profile api
db.Profile.remove({},function(err,profiles) {
	console.log('removed all profiles');
	db.Profile.create(new_profile,function(err,doc) {
		if(err){
			console.log('Error: ',err);
		} 
		// console.log('created profile pets', doc.pets);
		new_profile.save(function(err,savedPro){
			console.log('saved');
		});
			// console.log("Created: ", doc);
			mongoose.connection.close();
	});
});



//make project api
db.Project.remove({},function(err,projects) {
	console.log('removed all projects');
	db.Project.create(project_list,function(err,doc) {
		if(err){console.log('Error: ',err);} 
	project_list.forEach(function(projectData){
		var proj = new db.Project({
				id: projectData.id,
				name: projectData.name,
				platform: projectData.platform,
				purpose: projectData.purpose,
				skills: projectData.skills,
				items_needed: projectData.items_needed,
				source: projectData.source,
				complete: projectData.complete
			});
	
	
		console.log('created project ' );
		proj.save(function(err,savedProject){
			if (err) {return console.log(err);}
			console.log('saved');
		});
			mongoose.connection.close();
		});
	});
});