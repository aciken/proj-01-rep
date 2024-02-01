const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let open;

import('open').then((module) => {
  open = module.default;
});
const { v4: uuid } = require('uuid');
const app  = express();
const cron = require('node-cron');
const youtube = require('youtube-api');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const multer = require('multer');
const credentials = require('./credentials.json');
const dotenv = require('dotenv').config();
const OpenAI = require('openai');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
const axios = require('axios'); 


const openai = new OpenAI({apiKey: process.env.OPEN_API_KEY});


const storage = multer.diskStorage({
  destination: './uploads',
  filename(req, file, cb) {
    const newFilename = `${uuid()}-${file.originalname}`

    cb(null, newFilename);
  }
});

const uploadVideoFile = multer({
  storage: storage,
  }).single("videoFile");

const upload = multer({
  storage: storage,
}).fields([{ name: 'videoFile', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]);



app.post('/send', uploadVideoFile, async (req, res) => {

  async function main1(transcriptionText) {
    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "give me description in 6 to 12 words on what this youtube video is about acording to its text:  " + transcriptionText},
      ],
      model: "gpt-3.5-turbo",
    });
  
    res.send(completion.choices[0].message.content);
    console.log(completion.choices[0].message.content);
  }

  const audioFun=async()=>{
    const transcription=await openai.audio.transcriptions.create({
        file:fs.createReadStream(`./uploads/${req.file.filename}`),
       model:"whisper-1"
    })

    main1(transcription.text)



}

audioFun()




})




app.post('/upload', upload, (req, res) => {
  console.log(`${req.files.videoFile}, ${req.files.thumbnail}`)

  if(req.files.videoFile && req.files.thumbnail){
    console.log(req.files.videoFile[0], req.files.thumbnail[0])
    const filename = req.files.videoFile[0].filename;
    const thumbnail = req.files.thumbnail[0].filename;
    const {title, description} = req.body;
    
    open(oAuth.generateAuthUrl({
      acces_type: 'offline',
      scope: 'https://www.googleapis.com/auth/youtube.upload',
      state: JSON.stringify({
        filename,
        title,
        description,
        thumbnail
      })
    }))
  } else{
    return res.status(400).send('No files were uploaded.');
  }
})


app.get('/oauth2callback', (req, res) => {
  res.redirect('http://localhost:5173/success');
  const {filename, title, description, thumbnail} = JSON.parse(req.query.state);

  oAuth.getToken(req.query.code, (err, tokens) => {
    if(err){
      console.log(err);
      return;
    }

    oAuth.setCredentials(tokens);

    youtube.videos.insert({
      resource: {
        snippet: {title, description},
        status: {privacyStatus: 'private'}
      },
      part: 'snippet,status',
      media: {
        body: fs.createReadStream(`./uploads/${filename}`)
      },
    }, (err, data) => {
      if(err) {
        console.log(err);
        return;
      }

      const videoId = data.data.id;

      youtube.thumbnails.set({
        videoId: videoId,
        media: {
          mimeType: 'image/jpeg',
          body: fs.createReadStream(`./uploads/${thumbnail}`)
        }
      }, (err, response) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log('Thumbnail uploaded.');
        console.log('Done');
        process.exit();
      });
    });
  });
});

const oAuth = youtube.authenticate({
  type: 'oauth',
  client_id: credentials.web.client_id,
  client_secret: credentials.web.client_secret,
  redirect_url: credentials.web.redirect_uris[0]
});






mongoose.connect("mongodb://localhost:27017/proj-01")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName:{
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
    }
    });



    const collection = mongoose.model('collection', UserSchema);






app.get("/login", cors(), (req, res) =>{

})


app.post("/login", async (req, res) => {
  const { email, password} = req.body;

  try {
    const check = await collection.findOne({ email: email, password: password});

    if (check) {
      res.json(check);
    } else {
      res.json("not exist");
    }
  } catch (e) {
    console.error(e); // Log the error, but don't send a response here
  }
});

    


app.get("/signup", cors(), (req, res) =>{

})


app.post("/signup",async(req,res) => {
  const {firstName, lastName, email, password} = req.body;

  const coll = new collection({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    tier: "3"
  });

  try {
    const check = await collection.findOne({ email: email });


    if (check) {
      res.json("exist");
    } else {
      await coll.save();
      console.log(coll);
      res.json(coll);
    }
  } catch (e) {
    console.error(e);
  }
});

app.put('/updateUsage', async (req, res) => {
  const { id, usage } = req.body;

  try {
    const user = await collection.findOne({ email: id });
    if (user) {
      user.usage = usage;
      await user.save();
      res.json({ message: 'Usage updated successfully!', usage: user.usage });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// app.put('/updateUsage', async (req, res) => {
//   const { id, usage } = req. body;
//   console.log(id, usage)

//   try {
//     const user = await collection.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.usage = usage;
//     await user.save();

//     res.json({ message: 'Usage updated successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);

  ws.on('close', () => {
    clients = clients.filter(client => client !== ws);
  });
});

cron.schedule('27 14 * * *', async () => {
  try {
    // Assuming `collection` is your Mongoose model
    await collection.updateMany({}, { usage: 0 });
    console.log('Usage reset successfully!');

    clients.forEach(client => client.send('usage reset'));
  } catch (error) {
    console.error('Failed to reset usage:', error);
  }
});




app.listen(3000, () => console.log("Server is running on port 3000"));