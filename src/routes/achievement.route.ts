import {Router, Request, Response} from "express"
import { getAchievementImage } from "../services/playerAchievement.service"
import path from "path"

const router = Router()

router.get("/:playername", async function (req: Request, res: Response){
    console.log("Request recieved from "+req.ip)
    const playername = req.params.playername
    const type = String(req.query.type)
    const reached = Number(req.query.reached)
    console.log("Getting image...")
    const img = await getAchievementImage(playername,type,reached)
    const filename =`playerachievement_${playername}_${type}_${reached}.jpeg`
    console.log("Image getted. Sending response...")
    res.set("Content-Type", "image/jpeg")
    res.sendFile(filename , {root: path.join("./imagescache")});
    console.log("Response sended")
})

export default router