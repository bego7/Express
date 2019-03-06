// for validating
const Joi = require('joi');
const express =require('express');
const app = express();
// to use json formatting
app.use(express.json());

const genres =[
    {id: 1, name: "action"},
    {id: 2, name: "drama"},
    {id: 3, name: "comedy"}
];

// get all genres
app.get('/vidly.com/api/genres', (req,res)=>{
    res.send(genres)
});

// get a specific genre, given by the id
app.get('/vidly.com/api/genres/:id', (req,res)=>{
// checar si existe
    const genre =genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("Genre with specified id not found")
    res.send(genre);
});

// post a genre

app.post('/vidly.com/api/genres',(req,res)=>{
    const {error}= validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length+1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

// update genre

app.put('/vidly.com/api/genres/:id',(req,res)=>{
    // check if it exists
    const genre =genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("Genre with specified id not found")

    // validate 
    const {error}= validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    // update 
    genre.name=req.body.name;
    res.send(genre);
});

// delete a specifig genre
app.delete('/vidly.com/api/genres/:id',(req,res)=>{
    // check if it exists
    const genre =genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("Genre with specified id not found")

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});

// function used to validate if an input is valid
function validateGenre(genre){
    const schema={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre,schema);
}

// port where it´s listening
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));