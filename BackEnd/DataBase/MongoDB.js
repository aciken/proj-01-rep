const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    tier:{
      type: String
    },
    usage:{
      type: Number,
      default: 0
    },
    credits:{
      type: Number,
      default: 5
    },
    verified:{
      type: Number,
      default: 0
    },
    history:{
      type: Array,
      default: []
    },
    restartCode:{
      type: String,
      default: ''
    }
    });

    const collection = mongoose.model('collection', UserSchema);

    module.exports = collection;
