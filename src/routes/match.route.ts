import {Router, Request, Response} from "express"
import { getMatchImage } from "../services/match.service"
import path from "path"

const router = Router()

router.get("/:id", async function (req: Request, res: Response){
    console.log("Request recieved from "+req.ip)
    const id = req.params.id
    console.log("Getting image...")
    const img = await getMatchImage(id)
    console.log("Image getted. Sending response...")
    res.set("Content-Type", "image/jpeg")
    res.sendFile(`match_${id}.jpeg` , {root: path.join("./imagescache")});
    console.log("Response sended")
})

export default router