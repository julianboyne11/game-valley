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
      Game.find({owner: profile._id})
      .populate("owner")
      .then(games => {
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
  Profile.findById(req.user.profile._id)
  .then(profile => {
    const alreadyLiked = profile.likeGames.some(game => {
      return game.toString() === req.params.id
    })
    if(!alreadyLiked) {
      profile.likeGames.push(req.params.id)
    }
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