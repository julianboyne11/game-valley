import { Router } from 'express'
import * as consolesCtrl from "../controllers/consoles.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get("/new", isLoggedIn, consolesCtrl.newConsole)

export {
  router
}