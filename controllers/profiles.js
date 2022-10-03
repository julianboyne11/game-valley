import { Profile } from "../models/profile.js"

function showMyProfile(req, res) {
  Profile.find({})
  .then(profiles => {
    Profile.findById(req.params.id)
    .then(profile => {
      const isSelf = profile._id.equals(req.user.profile._id)
      res.render('profiles/show', {
        title: `${profile.name}'s profile`,
        isSelf,
        profiles,
        profile,
      })
    })
  })
}

export {
  showMyProfile
}