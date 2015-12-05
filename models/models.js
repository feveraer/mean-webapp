var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String, //hash created from password
    created_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
    //created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_by: String,
    created_at: { type: Date, default: Date.now },
    text: String
});

//register a User and Post model with mongoose
mongoose.model('User', userSchema);
mongoose.model('Post', postSchema);
