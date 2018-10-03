const bodyParser = require("body-parser"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

// App Config
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


// Mongoose , Model config
const blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    createDate:{
        type:Date,
        default:Date.now()
    }
});
const Blog = mongoose.model("blog",blogSchema);

// Routing
app.get("/",(req,res)=>{
    res.redirect('/blogs');
});

//Index
app.get("/blogs",(req,res)=>{
    Blog.find({},(err,blogs)=>{
        if(err){
            console.log(err);
        } else{
            res.render("index",{blogs:blogs});
        }
    });
});

//NEW ROUTING
app.get("/blogs/new",(req,res)=>{
    res.render("new");
});

//CREATE ROUTING
app.post("/blogs",(req,res)=>{
   Blog.create(req.body.blog,(err,newblog)=>{
      if(err){
          console.log(err);
      }else{
          res.redirect("/");
      }
   }); 
});

//SHOW ROUTING
app.get("/blogs/:id",(req,res)=>{
    const Id = req.params.id ;
    Blog.findById(Id,(err,result)=>{
        if(err){
            res.redirect("/");
        }else{
            res.render("show",{blog:result});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log('BlogApp Server has Start at https://mypjbootcamp-mythk.c9users.io/ !!');
});
