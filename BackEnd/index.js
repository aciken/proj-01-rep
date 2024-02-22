const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const {lemonSqueeztApiInstance} = require("./utils/axios.js");

const crypto = require('crypto');


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
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');




const openai = new OpenAI({apiKey: process.env.OPEN_API_KEY});


function generateRandomKey(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}





async function convertToJpg(imageUrl, key) {
  const response = await axios({
    url: imageUrl,
    method: 'GET',
    responseType: 'arraybuffer'
  });

  await sharp(response.data)
    .jpeg()
    .toFile(`E:/programiranje/repos/proj-01-rep/FrontEnd/public/thumbnails/${key}.jpg`);
}




const convertToAudio = (inputPath, outputPath) => {
  console.log(inputPath, outputPath)
  return new Promise((resolve, reject) => {
    console.log('Converting to audio')
      console.log(inputPath)
      ffmpeg(inputPath)
          .output(outputPath)
          .on('end', resolve)
          .on('error', reject)
          .run();

  });
};



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




function limitTextLength(text) {
  if (text.length > 3500) {
    return text.substring(0, 3500);
  } else {
    return text;
  }
}




app.use('/convertUrl', async (req, res) => {
  const key = generateRandomKey(7);
  console.log(req.body.url)
  try {
    await convertToJpg(req.body.url, `${key}`);
    res.json({key: key});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while converting the URL to JPG.');
  }
});


app.post('/send', uploadVideoFile, async (req, res) => {




  async function main1(transcriptionText) {
    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "give me description in 8 to 12 words on what this youtube video is about acording to its text:  " + transcriptionText},
      ],
      model: "gpt-3.5-turbo",
    });



    // splitAudio('input.mp3', 300, 'output%03d.mp3');
  
    res.send(completion.choices[0].message.content);
    console.log(completion.choices[0].message.content);
  }

  

 let audioKey = generateRandomKey(7);


  convertToAudio(`./uploads/${req.file.filename}`, `./uploads/${audioKey}.mp3`)
    .then(() => console.log('Conversion completed'))
    .then(() =>{
      const audioFun=async()=>{
        console.log(`${audioKey}.mp3`)
        const transcription=await openai.audio.transcriptions.create({
            file:fs.createReadStream(`./uploads/${audioKey}.mp3`),
           model:"whisper-1"
        })

        
        const newText = limitTextLength(transcription.text);
        main1(newText)
    
    
    
    }
audioFun()
    
    })
    .catch(console.error);


// console.log(req.file.filename)





// fs.watch('./uploads', async (eventType, filename) => {
//   if (eventType === 'rename' && filename.endsWith('.mp3')) {
//     console.log(`New mp3 file added: ${filename}`);
//     audioKey = filename.replace('.mp3', ''); // assuming audioKey is a global variable
//     await audioFun();
//   }
// });




})




app.post('/upload', uploadVideoFile, (req,res) => {
  if(req.file){
    const filename = req.file.filename;
    const {title, description, thumbnail} = req.body;

    console.log(thumbnail, title, description, filename)

const imageKey = generateRandomKey(7)

    convertToJpg(thumbnail, imageKey)
  .then(() => console.log('Image converted successfully'));
    
    
    
    open(oAuth.generateAuthUrl({
      acces_type: 'offline',
      scope: 'https://www.googleapis.com/auth/youtube.upload',
      prompt: 'consent',
      state: JSON.stringify({
        filename,
        title,
        description,
      thumbnail,
      imageKey
      })
    }))
  }
})


// app.post('/upload', upload, (req, res) => {

//   console.log(req.files.videoFile, req.files.thumbnail)

//   if(req.files.videoFile && req.files.thumbnail){
//     console.log(req.files.videoFile[0], req.files.thumbnail[0])
//     const filename = req.files.videoFile[0].filename;
//     const thumbnail = req.files.thumbnail[0].filename;
//     const {title, description} = req.body;
    
//     open(oAuth.generateAuthUrl({
//       acces_type: 'offline',
//       scope: 'https://www.googleapis.com/auth/youtube.upload',
//       state: JSON.stringify({
//         filename,
//         title,
//         description,
//         thumbnail
//       })
//     }))
//   } else{
//     return res.status(400).send('No files were uploaded.');
//   }
// })


app.get('/oauth2callback', (req, res) => {
  res.redirect('http://localhost:5173/success');
  const {filename, title, description, thumbnail,imageKey} = JSON.parse(req.query.state);

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
          mimeType: 'image/png',
          body: fs.createReadStream(`./uploads/${imageKey}.jpg`)
        }
      }, (err, response) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log('Thumbnail uploaded.');
        console.log('Done');
        // process.exit();
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
      default: 0
    },
    verified:{
      type: Number,
      default: 0
    }
    });



    const collection = mongoose.model('collection', UserSchema);




sgMail.setApiKey(process.env.SEND_GRID_API_KEY);



app.post('/sendMail', async (req, res) => {
  const {email, code} = req.body;
  try {
    const msg = {
      to: email,
      from: 'adrianmarton2006@gmail.com',
      subject: 'Verification code',
      text: `Your verification code is: ${code}`,
      html: `<strong>Your verification code is: ${code}</strong>`,
  };
  await sgMail.send(msg);
  } catch (e) {
    console.error(e);
  }

})






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
  const {firstName, email, password} = req.body;

const verification = getRandomNumber(1000,9999);
console.log(verification)

  const coll = new collection({
    firstName: firstName,
    email: email,
    password: password,
    verified: verification
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


app.put('/verified', async (req, res) => {
 const {email} = req.body;

 try {
   const user = await collection.findOne({ email: email });

   if(user){
      user.verified = 1;
      await user.save();
      res.json({message: 'User verified successfully!'});
   }
 } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
})

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

app.put('/updateCredits', async (req, res) => {
  const {id, credits} = req.body;

  try{
    const user = await collection .findOne({email: id});
    if(user){
      user.credits = credits;
      await user.save();
      res.json({message: 'Credits updated successfully!', credits: user.credits});
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
})


app.post('/creditSend', async (req, res) => {
  const {id} = req.body;

  try {
    const logedUser = await collection.findOne({email: id})
      res.json(logedUser)

  } catch (error) {
    
  }


})

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

cron.schedule('00 00 * * *', async () => {
  try {
    // Assuming `collection` is your Mongoose model
    await collection.updateMany({}, { usage: 0 });
    console.log('Usage reset successfully!');

    clients.forEach(client => client.send('usage reset'));
  } catch (error) {
    console.error('Failed to reset usage:', error);
  }
});






app.post('/api/purchaseProduct', async (req, res) => {
  try {
    const reqData = req.body;
    const email = req.body.id;

    console.log(reqData, email)

    console.log(req.body)

    if(!reqData.productId) 
      return res.status(400).json({message: "productId is required"});

      console.log('asd')
    const response = await lemonSqueeztApiInstance.post('/checkouts', {
      data: {
        type: "checkouts",
        attributes:{
          checkout_data:{
          custom:{
            user_id: email,
          },
        },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEZZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: reqData.productId.toString(),
            },
          },
        },
      },
    });

    const checkoutUrl = response.data.data.attributes.url;

    console.log(response.data);
    console.log('yea')

    return res.json({checkoutUrl})
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
})


app.post('/api/webhook', async (req, res) => {
  try {
    let reqClone = Object.assign({}, req);
const eventType = req.headers.content_type;
const body = req.body;

    const secret = process.env.LEOMON_SQUEEZY_WEBHOOK_SIGNATURE;
    if (!secret) {
      console.error('The secret is undefined!');
      return res.status(500).json({message: "Server Error"});
    }



    const hmac      = crypto.createHmac('sha256', secret);
    const digest    = Buffer.from(hmac.update(JSON.stringify(req.body)).digest('hex'), 'utf8');
    const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');

    console.log(digest, signature)
    console.log(signature.length, digest.length)
    if (digest.length !== signature.length) {
      console.error('The digest and signature have different lengths!');
      return res.status(400).json({message: "Invalid request"});
    }


    console.log(body);

    if(eventType === "order_created"){
      const userId = body.meta.custom_data.user_id;
      const isSuccesful = body.data.attributes.status === "paid";
    }

    const userID = body.meta.custom_data.user_id
    const tokenValue = body.data.attributes.total_usd

    const user = await collection.findOne({ email: userID });
    if (user) {
      user.credits += tokenValue;
      await user.save();
      console.log("added credits")
    } else {
      console.log("user not found")
    }

    return res.status(200).json({message: "Webhook received successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Server Error"});
  }
});





app.listen(3000, () => console.log("Server is running on port 3000"));