//const express = require ('express');
// const app=express();
// app.get('/',(req,res)=>{
//     res.send('Hello World');
// });
// app.get('/api/courses',(req, res)=>{
//     res.send([1,2,3]);
// });
// app.listen(3000,()=>console.log('Listening on PORT ...'));
const Joi=require('joi');
const express=require ('express');
const app=express();
app.use(express.json());
const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]
app.get('/',(req,res)=>{
    res.send('Hello world');
});
app.get('/api/courses',(req,res)=>{
    // res.send([1, 2, 3]);
    res.send(courses);
});
// app.get('/api/posts/:year/:months',(req,res)=>{
    //res.send(req.params.id);
    //res.send(req.query);
    // res.send(req.params);
    app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)//404 object not found
    res.status(404).send('id not found');
    res.send(course);
});
app.post('/api/courses',(req,res)=>{
    // move all of these below
    // const schema={
    //     name:Joi.string().min(3).required()
    // };
    // const result=Joi.validate(req.body, schema);
    // // console.log(result);
    // if(result.error){
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    // if(!req.body.name||req.body.length<3)
    // {
    //     res.status(400).send('name must be greater than 3 characters');
    //     return;
    // }
    const {error}=validateCourse(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course={
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});

// app.post();
app.put('/api/courses/:id',(req,res)=>{
    // 1    lookup the course
    // 2    if not found return 404
    // 3    validate if invalid return 400 bad request
    // 4    update course
    // 5    return the updated course
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)//404 object not found
    res.status(404).send('id not found');
    const result=validateCourse(req.body);
    // result.error ki jagah this is object destructuring
   
// const schema={
//         name:Joi.string().min(3).required()
//     };
//     const result=Joi.validate(req.body, schema);
    // console.log(result);
    // comment section k liy idr result.error hi run ho ga
    const {error}=validateCourse(req.body);
     if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    course.name=req.body.name;
    res.send(course);
});
function validateCourse(course){
    const schema={
        name=Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
// app.delete();
app.listen(5000,()=>console.log('listening on port 5000'));
