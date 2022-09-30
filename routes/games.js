import { Router } from 'express'
import * as gameCtrl from "../controllers/games.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get("/new", isLoggedIn, gameCtrl.new)

export {
  router
}