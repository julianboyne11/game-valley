import { Router } from 'express'
import * as consoleCtrl from "../controllers/consoles.js"
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()



export {
  router
}