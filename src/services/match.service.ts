import { captureImage } from "./imageCapture"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

const DEVMODE = process.env.DEVMODE || false;
const BASE_URL = DEVMODE ? "https://www.caracantosmeaos.club" : "http://localhost:4321"

const getMatchImage = async (matchid: number|string) => {
    const filepath = `./imagescache/match_${matchid}.jpeg`
    if(!fs.existsSync(filepath)){
        await captureImage(`${BASE_URL}/imagegenerator/matchsummary/${matchid}`, "match_"+matchid, "#to_image", 1920, 1080)
        return fs.readFileSync(filepath)
    }
    return fs.readFileSync(filepath)
}

export {getMatchImage}