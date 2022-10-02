import { Router } from 'express'
import * as gamesCtrl from "../controllers/games.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get("/new", isLoggedIn, gamesCtrl.new)
router.get("/:id", isLoggedIn, gamesCtrl.show)
router.get("/:id/edit", isLoggedIn, gamesCtrl.edit)
router.post("/", isLoggedIn, gamesCtrl.create)
router.post("/:id/comments", isLoggedIn, gamesCtrl.createComment)
router.post("/:id/consoles", isLoggedIn, gamesCtrl.addToConsoles)
router.put("/:id", isLoggedIn, gamesCtrl.update)
router.delete("/:id", isLoggedIn, gamesCtrl.delete)



export {
  router
}