import express, { Application, Request, Response } from 'express'
import mongoose, { connect } from 'mongoose'
import 'dotenv/config'
import vacations from './routes/vacations'
import registerLogIn from './routes/auth'
// import follow from './routers/follow.js' ????
import cors from 'cors'

const mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`

console.log('Trying to connect to mongodb');

mongoose.set("strictQuery", false);

console.log(mongoUrl);

connect(mongoUrl)

.then(() => console.log('Successfully connect to mongodb'))
.catch ((error) => {
    console.log(error)
})

const app: Application = express()

app.use(
    cors({
      origin: 'http://localhost:3000',
    })
  )
  

app.use(express.json())

app.use('/vacations', vacations)
app.use('/auth', registerLogIn)
// app.use('/follow', follow) ????????

app.use((req:Request, res:Response)=> {
    res.sendStatus(404).send(`Endpoint not supported ${req.url}`)
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening on port ${process.env.APP_PORT}`);
})