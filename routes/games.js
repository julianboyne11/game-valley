import { Router } from 'express'
import * as gameCtrl from "../controllers/games.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get("/new", isLoggedIn, gameCtrl.new)
router.get("/:id", isLoggedIn, gameCtrl.show)
router.post("/", isLoggedIn, gameCtrl.create)

export {
  router
}