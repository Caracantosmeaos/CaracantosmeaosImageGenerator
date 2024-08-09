import {Router, Request, Response} from "express"
import { getMatchImage } from "../services/match.service"
import path from "path"

const router = Router()

router.get("/:id", async function (req: Request, res: Response){
    const id = req.params.id
    await getMatchImage(id)
    res.set("Content-Type", "image/jpeg")
    res.sendFile(`match_${id}.jpeg` , {root: path.join("./imagescache")});
})

export default router