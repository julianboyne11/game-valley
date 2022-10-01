import { Game } from "../models/game.js"
import { Console } from "../models/console.js"

function newGame(req, res) {
  res.render("games/new", {
    title: "Add Game"
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  req.body.owner = req.user.profile._id
  Game.create(req.body)
  .then(game => {
    console.log(game);
    res.redirect("/games/show")
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

function show(req, res) {
  Game.findById(req.params.id)
  .populate("consoles")
  .then(game => {
    Console.find({_id: {$nin: game.consoles}})
    .then(consoles => {
      res.render("games/show", {
        title: `${game.title}`,
        game,
        consoles
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Game.findById(req.params.id)
  .populate("owner")
  .then(game => {
    res.render("games/edit", {
      game,
      title: `Edit ${game.title}`
    })
  })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Game.findById(req.params.id)
  .then(game => {
    if (game.owner.equals(req.user.profile._id)){
      game.update(req.body)
      .then(updatedGame => {
        res.redirect(`/games/${game._id}`)
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteGame(req, res) {
  Game.findByIdAndDelete(req.params.id)
  .then(game => {
    res.redirect("/games/new")
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  newGame as new,
  create,
  index,
  show,
  edit,
  update,
  deleteGame as delete,
}