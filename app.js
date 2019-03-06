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
    res.send([1,2,3,4,5]);
});

app.get('/api/posts/:month/:year', (req,res)=>{
    res.send(req.params);
});
// app.get('/api/courses/:id',(req,res)=>{
//     // find method available, argumnet expected a function, used to find something that matches a given criteria
//     const course =courses.find(c => c.id === parseInt(req.params.id))
//     if(!course) res.status(404).send("Course not found");
//     res.send(course);
// });

app.post('/api/courses',(req,res)=>{
    const schema ={
        name:Joi.string().min(3).required()
    };
    const result =Joi.validate(req.body,schema);
    console.log(result);
    if(!req.body.coursename || req.body.coursename<3){
       res.status(400).send('Coursename irs requiered and should be at least 3 characters') ;
       return;
    }
    const course ={
        
        id: courses.length +1,
        // this means, im passing it through the url
        coursename: req.body.coursename
    };

    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`Listening on port ${port}`));
