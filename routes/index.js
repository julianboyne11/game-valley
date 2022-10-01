import { Router } from 'express'
import * as gamesCtrl from "../controllers/games.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', gamesCtrl.index)


export {
  router
}
