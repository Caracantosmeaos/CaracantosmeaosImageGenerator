import { captureImage } from "./imageCapture"
import fs from "fs"


const getMatchImage = async (matchid: number|string) => {
    const filepath = `./imagescache/match_${matchid}.jpeg`
    if(!fs.existsSync(filepath)){
        await captureImage("http://localhost:4321/imagegenerator/matchsummary/"+matchid, "match_"+matchid, "#to_image", 1920, 1080)
        return fs.readFileSync(filepath)
    }
    return fs.readFileSync(filepath)
}

export {getMatchImage}