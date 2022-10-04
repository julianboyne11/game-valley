import { Profile } from "../models/profile.js"
import { Game } from "../models/game.js"

function showProfile(req, res) {
  Profile.find({})
  .populate("likeGames")
  .then(profiles => {
    Profile.findById(req.params.id)
    .populate("likeGames")
    .then(profile => {
      const isSelf = profile._id.equals(req.user.profile._id)
      Game.find({owner: req.user.profile._id})
      .populate("owner")
      .then(games => {
        console.log(games);
        res.render('profiles/show', {
          title: `${profile.name}'s profile`,
          isSelf,
          profiles,
          profile,
          games
        })
      })
    })
  })
}

function likeGame(req, res) {
  console.log(req.body, "Body");
  console.log(req.params.id);
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.likeGames.push(req.params.id)
    profile.save()
    .then(() => {
      res.redirect(`/games/${req.params.id}`)
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



export {
  showProfile,
  likeGame,
  
}