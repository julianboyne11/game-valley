import { Game } from "../models/game.js"
import { Console } from "../models/console.js"
import { Profile } from "../models/profile.js"

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
  .populate("owner")
  .then(game => {
    Console.find({_id: {$nin: game.consoles}})
    .then(consoles => {
      Profile.findById(req.user.profile._id)
      .then(profile => {
        console.log(profile, "Profile");
        res.render("games/show", {
          title: `${game.title}`,
          game,
          consoles,
          profile,
        })
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

function createComment(req, res) {
  Game.findById(req.params.id)
  .populate("owner")
  .then(game => {
    game.comments.push(req.body)
    game.save()
    .then(() => {
      res.redirect(`/games/${game._id}`)
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

function addToConsoles(req, res) {
  Game.findById(req.params.id)
    .then(game => {
      game.consoles.push(req.body.consoleId)
      game.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
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
  createComment,
  addToConsoles,
}