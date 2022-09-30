import { Game } from "../models/game.js"
import { Console } from "../models/console.js"

function newGame(req, res) {
  res.render("games/new", {
    title: "Add Game"
  })
}


export {
  newGame as new
}