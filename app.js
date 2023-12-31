const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

main().catch(err => console.log(err));
async function main() {
   mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 80;
// Define mongoose schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });
const contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res)=>{
    res.render('about.pug',{
        title: 'home page'
    })
})
app.get('/service', (req, res)=>{
    res.render('service.pug',{
        title: 'home page'
    })
})
app.get('/classesInfo', (req, res)=>{
    res.render('classesInfo.pug',{
        title: 'home page'
    })
})
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body)
    myData.save().then(()=>{
        res.send("this item has been saved to database ")
    }).catch(()=>{
        res.status(400).send("item was not send to the data base")
    });
    // res.status(200).render('contact.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});