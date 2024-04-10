const mongoose = require('mongoose');

// Створення схеми
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

// Створення моделі на основі схеми
const User = mongoose.model('User', userSchema, 'User');

module.exports = User;
