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


export {
  newConsole,
}