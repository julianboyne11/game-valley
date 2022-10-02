import { Console } from "../models/console.js"

function newConsole(req, res) {
  Console.find({})
  .then(consoles => {
    res.render("consoles/new", {
      title: "Add Console",
      consoles
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  Console.create(req.body)
  .then(console => {
    res.redirect("/consoles/new")
  })
}

export {
  newConsole as new,
  create,
}