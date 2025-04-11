const express = require("express");
const app = express();
const PORT = 3005;



//---------- Routing -------------

// app.use(express.json())

// app.post('/users' ,(req, res)=>{
//     const {name, email} = req.body;
//     res.json({
//         message: `User ${name} with email ${email} created succesfilly`
//     })
// })

// app.put('/users/:id', (req, res)=>{
//     const userId = req.params.id;
//     const {name, email} = req.body;

//     res.json({
//         message: `User ${userId} is updated, ${name} with email ${email} created successfully`
//     })
// });

// app.get('/terms/:name/:id', (req,res)=>{
//     const {name, id} = req.params
//     res.json({ 
//         id,
//         name
//     })
// })

app.use((req, res, next) => {
    console.log("A new request was received at " + Date.now())
    next()
})
app.get('/', (req, res)=>{
    const user = req.params.user;
    res.send(`hello Alpha `);
});

app.listen(PORT, ()=>{
    console.log(`Server runing on http://localhost:${PORT}`)
});