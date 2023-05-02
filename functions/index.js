import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { login, signup } from './src/users.js'
import { addShow, getShows } from './src/shows.js'

const PORT = 3005


const app = express()
app.use(cors())
app.use(express.json())

// routes

app.post('/signup',signup)
app.post('/login',login)
app.post('/addshow',addShow)
app.get('/shows',getShows)

// show routes



// run without emulator
app.listen(PORT,()=>console.log(`Listening on http://localhost:${PORT}`))

export const api = functions.https.onRequest(app) // exports our cloud function


// todo
// mobile ready projs
// neaten projs
// setup portfolio site