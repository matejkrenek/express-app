const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const projectRoutes = require('./routes/projectRoutes')

// express app
const app = express();

// Connect to mongoDB
const dbURI = 'mongodb+srv://matejkrenek:192003mates@expressapp.q3vmc.mongodb.net/express-app?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err)
    })


// register view engine
app.set('view engine', 'ejs');

// middleware statics file
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

// mongoose and mongo sandbox routes


app.get('/', (req, res) => {
    res.redirect('/projects')
});


app.get('/about', (req, res) => {
    res.status(200).render('about', { title: 'About' });
});

app.use('/projects', projectRoutes)

// 404 error
app.use((req, res) => {
    res.status(404).render('404', { title: '404 Not Found' });
})


