import mongoose from 'mongoose'

const Schema = mongoose.Schema

const consoleSchema = new Schema({
  name: { type: String, required: true},
  game:[{type: Schema.Types.ObjectId, ref: "Game"}]
}, {
  timestamps: true
})

const Console = mongoose.model('Console', consoleSchema)

export {
  Console
}
