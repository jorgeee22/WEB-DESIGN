const express = require("express");
const app = express();
const https = require("https");
const FormData = require("form-data");

// Configure the Express server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [];
let username = '';


 app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});


app.get("/home", (req, res) => {
  if (!username) {
    return res.redirect('/');
}
res.render('home', { username, posts });
});

app.post('/login', (req, res) => {
  username = req.body.name; 
  res.redirect('/home'); // Redirige a la página de inicio después de iniciar sesión
});

app.post("/add-post", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.redirect("/home");
});


app.get("/post/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("post", { post });
});

app.post("/edit-post/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.content = req.body.content;
  }
  res.redirect(`/post/${post.id}`);
});


app.post("/delete-post/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/home");
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});



/* app.route("/login")
  .get((req, res) => {
    const name = req.query.name || "Guest";
    res.send(`Hello, ${name}! You have accessed this page via GET (unsecured).`);
  })
  .post((req, res) => {
    const name = req.body.name || "Guest";
    res.send(`Hello, ${name}! You have accessed this page via POST (secured).`);
  });

*/