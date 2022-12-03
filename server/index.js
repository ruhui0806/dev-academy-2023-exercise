const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')

const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connect to Mongo DB successfully '))
    .catch((error) => {
        console.log(
            'error occurred when connecting to Mongo DB:',
            error.message
        )
    })

const port = process.env.PORT || 9000

const app = express()

app.use(cors())

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development',
    })
)

app.listen(port, console.log(`Server running on port ${port}`))
