// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

 var db = require('./models');


/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));
app.use(express.static('seed.js'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/seed', function seed(req, res) {
  res.sendFile(__dirname + './seed.js');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/git-clay/express-personal-api/README.md", // CHANGE ME
    base_url: "https://tranquil-mountain-12063.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints aka: you are here"},
      {method: "GET", path: "/api/profile", description: "The basics about me"}, // CHANGE ME
      {method: "GET", path: "/api/project", description: "all projects to pick from"}, // CHANGE ME
      {method: "GET", path: "/api/project/:id", description: "select project by id #"}, // CHANGE ME
      {method: "POST", path: "/api/project", description: "Create a new project"}, // CHANGE ME
      {method: "PUT", path: "/api/project/:id", description: "Edit a project"}, // CHANGE ME
      {method: "DELETE", path: "/api/project/:id", description: "DESTROY!!!!"} // CHANGE ME
    ]
  });
});

// get profile √
app.get('/api/profile', function (req, res) {
  // send profile as JSON response
  db.Profile.find()
    .populate('profile')
    .exec(function(err, profile){
      if (err) { return console.log("index error: " + err); }
      res.json(profile);
    });
});

//INDEX √
app.get('/api/project', function (req, res){
console.log('get project');
  db.Project.find()
    .populate('project')
    .exec(function(err, project){
      if (err) { return console.log("index error: " + err); }
    res.json(project);

    });
});
//SHOW √
app.get('/api/project/:id', function (req, res){
var projId = req.params.id;
console.log('get project by id', projId);
  db.Project.findOne({id: req.params.id},function(err,project){
      if (err){return console.log('error:',err);}
      res.json(project);
  });
});

//query search (?platform = arduino)

//CREATE √ needs work on id
app.post('/api/project', function (req, res){
console.log('post new project');
   //this gets project length for id  db.Project.find().exec(function(err,project){console.log(project.length);});

  var newProj = new db.Project({
        name: req.body.name,
        platform: req.body.platform,
        purpose: req.body.purpose,
        skills: req.body.skills,
        items_needed: req.body.items_needed,
        source: req.body.source,
        complete: req.body.complete
  });
  console.log(newProj);
  newProj.save(function(err, proj){
    if(err){return console.log('error:",err');}
    console.log("posted", proj.name);
    res.json(proj);
  });
});
//UPDATE √ß
app.put('/api/project/:id', function (req, res){
console.log('get project');
var projId = req.params.id;
  db.Project.findOne({id: projId}, function(err,project){
      if (err){return console.log('error:',err);}
        if(req.body.id) project.id = req.body.id;
        if(req.body.name) project.name = req.body.name;
        if(req.body.platform) project.platform = req.body.platform;
        if(req.body.purpose) project.purpose = req.body.purpose;
        if(req.body.skills) project.skills = req.body.skills;
        if(req.body.items_needed) project.items_needed = req.body.items_needed;
        if(req.body.source) project.source = req.body.source;
        if(req.body.complete) project.complete = req.body.complete;
    project.save(function(err,proj){
        if(err){return console.log('error:",err');}
         res.json(project.name+' updated');
    });
  });
});
//DELETE √
app.delete('/api/project/:id', function (req, res){
console.log('delete project by id');
  db.Project.findOneAndRemove({id: req.params.id},function(err,project){
      if (err){return console.log('error:',err);}
      res.json(project);
  });
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
