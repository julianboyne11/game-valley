import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  rating: { type: Number, min: 1, max: 5, default: 5 }
}, {
  timestamps: true
})

const gameSchema = new Schema({
  title: { type: String, required: true},
  genre: { type: String, required: true},
  releaseDate: Date,
  description: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  consoles: [{ type: Schema.Types.ObjectId, ref: "Console"}],
  comments: [commentSchema]
}, {
  timestamps: true,
})


const Game = mongoose.model('Game', gameSchema)

export {
  Game,
}