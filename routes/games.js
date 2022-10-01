import { Router } from 'express'
import * as gamesCtrl from "../controllers/games.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get("/new", isLoggedIn, gamesCtrl.new)
router.get("/:id", isLoggedIn, gamesCtrl.show)
router.get("/:id/edit", isLoggedIn, gamesCtrl.edit)
router.post("/", isLoggedIn, gamesCtrl.create)


export {
  router
}