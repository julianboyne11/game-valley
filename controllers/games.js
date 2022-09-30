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

function index(req, res) {
  Game.find({})
  .then(games => {
    res.render("index", {
      title: "Games",
      games
    })
  })
}


export {
  newGame as new,
  create,
  index,
}