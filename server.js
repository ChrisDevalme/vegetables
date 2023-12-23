require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')
const Vegetable = require('./models/vegetable')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded  ({ extended: true }))
app.use(methodOverride('_method'))
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('connected to the mongodb')
})

//Index

app.get('/vegetables', async (req, res) => {
    try {
        const foundVegetables = await Vegetable.find({})
        res.render('vegetables/Index', {
            vegetables: foundVegetables 
        })
    } catch (error) { 
        res.status(400).send({ message: error.message })
    }
})

// New 

app.get('/vegetables/new', (req, res) => {
    res.render('vegetables/New')
})

// Delete

app.delete('/vegetables/:id', async (req, res) => {
    try {
        await Vegetable.findOneAndDelete({'_id': req.params.id})
        .then(() => {
            res.redirect('/vegetables')
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// Update

app.put('/vegetables/:id', async (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    try {
        await Vegetable.findOneAndUpdate({'_id': req.params.id}, 
        req.body, { new: true })
        .then(() => {
            res.redirect(`/vegetables/${req.params.id}`)
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// Create 

app.post('/vegetables', async (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    try {
        const createdVegetable = await Vegetable.create(req.body)
        res.redirect(`/vegetables/${createdVegetable._id}`)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// Edit 

app.get('/vegetables/:id/edit', async (req, res) => {
    try {
        const foundVegetable = await Vegetable.findOne({ _id: req.params.id })
        res.render('vegetables/Edit', {
            vegetable: foundVegetable
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// Show 

app.get('/vegetables/:id', async (req, res) => {
    try {
        const foundVegetable = await Vegetable.findOne({_id: req.params.id })
        res.render('vegetables/Show', {
            vegetable: foundVegetable
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})


app.listen(PORT, () => {
    console.log(`connected app ${PORT}`)
})