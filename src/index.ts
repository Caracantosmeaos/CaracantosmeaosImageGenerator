import express, {Express} from "express"
import Dotenv from "dotenv"

const app:Express = express()

Dotenv.config()

const PORT = Number(process.env.PORT || 80)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

/**RUTAS */
import matchRouter from './routes/match.route'
app.use("/matchsummary", matchRouter)

const server = app.listen(PORT, '0.0.0.0')
server.setTimeout(500000);
console.log("Listening on port "+PORT)