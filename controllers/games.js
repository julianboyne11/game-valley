import { Game } from "../models/game.js"
import { Console } from "../models/console.js"

function newGame(req, res) {
  res.render("games/new", {
    title: "Add Game"
  })
}

function create(req, res) {
  console.log(req.body)
  Game.create(req.body)
  .then(game => {
    res.redirect("/games/new")
  })
}


export {
  newGame as new,
  create,
}