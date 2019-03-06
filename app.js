// its a class
const Joi = require('joi');

const express =require('express');
const app = express();
// we are adding a piece of middleware
app.use(express.json());
const courses =[
    {id: 1, coursename:'course1'},
    {id: 2, coursename:'course2'},
    {id: 3, coursename:'course3'}
];

// defino una ruta
app.get('/', (req,res)=>{
    res.send("Hello world");
});

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});

app.get('/api/posts/:month/:year', (req,res)=>{
    res.send(req.params);
});
app.get('/api/courses/:id',(req,res)=>{
    // find method available, argumnet expected a function, used to find something that matches a given criteria
    const course =courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("Course not found");
    res.send(course);
});

app.post('/api/courses',(req,res)=>{
    const {error}=validateCourse(req.body);
    //validate
    if(error){
        return res.status(400).send(error.details[0].message);
        
    }
    const course ={
        
        id: courses.length +1,
        // this means, im passing it through the url
        coursename: req.body.coursename
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{

    // if not found send 404 error
    const course =courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
        return res.status(404).send("Course not found");
       
    } 
    // {error} = result.error
    // object destructuring
    const {error}=validateCourse(req.body);
    //validate
    if(error){
        return res.status(400).send(error.details[0].message);  
    }

    // update course
    course.coursename=req.body.coursename;
     // return the updatedcourse
    res.send(course);
   
});

function validateCourse(course){
    const schema={
        coursename: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}

app.delete('/api/courses/:id',(req,res)=>{
    // Look up the course
    const course =courses.find(c => c.id === parseInt(req.params.id))
    // Not existing,return 404
    if(!course) 
    return res.status(404).send("Course not found");

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);
    // Return the same course
    res.send(course);
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`Listening on port ${port}`));
