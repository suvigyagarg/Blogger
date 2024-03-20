import express from 'express';
import bodyParser from 'body-parser';

const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let BlogPosts = [];
  let id = 0;


app.get('/',(req,res)=>{
    res.render("index.ejs",{BlogPosts: BlogPosts});
});


app.get("/post/:id",(req,res)=>{
    let id = req.params.id;
    let blog = BlogPosts.find(blog => blog.id == id);
    if (blog) {
        res.render("post.ejs", {blog: blog});
    } else {
        res.status(404).send('Blog post not found');
    }

});
  
app.post('/createPost',(req,res)=>{
    res.render("createPost.ejs");
});

app.post("/",(req,res)=>{
    
    let newBlog = {
        id: id,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        date: req.body.date,
        image: req.body.image
    };

    BlogPosts.push(newBlog);
    id++;
    console.log(BlogPosts);
    for(let i = 0; i < BlogPosts.length; i++) {
        let title = BlogPosts[i].title;
        console.log(title);
    }
    res.redirect("/");
});








app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
});
