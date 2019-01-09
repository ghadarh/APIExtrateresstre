const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const extraterrestreSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  age: Number,
  famille: String,
  race: String,
  nourriture: String,
});
extraterrestreSchema.pre('save', async function(next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Re-assign hashed version over original, plain text password
    this.password = passwordHash;
    next();
  } catch(error) {
    next(error);
  }
});

extraterrestreSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch(error) {
    throw new Error(error);
  }
}

//create a model
const Extraterrestre = mongoose.model('extraterrestre', extraterrestreSchema);
//export the model
module.exports = Extraterrestre;
