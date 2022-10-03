import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from "../controllers/profiles.js"


const router = Router()

router.get("/:id", isLoggedIn, profilesCtrl.showMyProfile)
router.patch("/:id/like-games", isLoggedIn, profilesCtrl.likeGame)


export {
  router
}