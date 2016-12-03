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

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
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
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/projects", description: "all projects to pick from"}, // CHANGE ME
      {method: "POST", path: "/api/projects", description: "E.g. Create a new project"} // CHANGE ME
    ]
  });
});

// get profile √
app.get('/api/profile', function (req, res) {
  // send profile as JSON response

  db.Profile.find()
    .populate('profile')    // populate fills in the description id with all the profile data
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
  db.Project.find(req.params.id,function(err,project){
      if (err){return console.log('error:',err);}
      res.json(project);
  });
});
//CREATE √ needs work on id
app.post('/api/project', function (req, res){
console.log('post new project');
  var newProj = new db.Project({
        id: db.Project.length+1,
        name: req.body.name,
        platform: req.body.platform,
        purpose: req.body.purpose,
        skills: req.body.skills,
        items_needed: req.body.items_needed,
        source: req.body.source,
        complete: req.body.complete
  });
  newProj.save(function(err, proj){
    if(err){return console.log('error:",err');}
    console.log("posted", proj.name);
    res.json(proj);
  });
});
//UPDATE
app.put('/api/project/:id', function (req, res){
console.log('get project');
});
//DELETE
app.delete('/api/project/:id', function (req, res){
console.log('delete project by id');
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
