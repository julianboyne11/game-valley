import mongoose from 'mongoose'

const Schema = mongoose.Schema

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