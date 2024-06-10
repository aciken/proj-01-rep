const collection = require('../DataBase/MongoDB');

const updateTitle = async (req, res) => {
    try {
        const { id, title, titleProcess, index } = req.body;
        const user = await collection.findOne({email : id});
        if(user){
            console.log(id, title, titleProcess, index)
            user.history[index].title = title;
            user.history[index].titleProcess = titleProcess;
            user.markModified('history'); // Tell Mongoose that the history array has been modified
            await user.save();

            res.json(user);
        } else{
            res.status(404).json({message: 'User not found'});
        }
    } 
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateDescription = async (req, res) => {
    try {
        const { id, description, descriptionProcess, index } = req.body;
        const user = await collection.findOne({email : id});
        console.log(id, description, descriptionProcess, index)
        if(user){
            console.log(id, description, descriptionProcess, index)
            user.history[index].description = description;
            user.history[index].descriptionProcess = descriptionProcess;
            user.markModified('history'); 
            await user.save();
            res.json(user);
        } else{
            res.status(404).json({message: 'User not found'});
        }
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateThumbnail = async (req, res) => {
    try {
        const { id, thumbnail, thumbnailProcess, index } = req.body;
        const user = await collection.findOne({ email : id });
        if(user){
            console.log(id, thumbnail, thumbnailProcess, index)
            user.history[index].thumbnail = thumbnail;
            user.history[index].thumbnailProcess = thumbnailProcess;
            user.markModified('history'); 
            await user.save();
            res.json(user);
        } else{
            res.status(404).json({message: 'User not found'});
        }
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { updateTitle, updateDescription, updateThumbnail }