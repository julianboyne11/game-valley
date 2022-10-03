import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  likeGames: [{type: Schema.Types.ObjectId, ref: "Game"}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
