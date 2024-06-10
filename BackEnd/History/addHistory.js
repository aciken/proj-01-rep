const collection = require('../DataBase/MongoDB');

const addHistory = async (req, res) => {
    try {
        const { id, history } = req.body;
        const user = await collection.findOne({email: id});
        if(user){
            if(user.history.length >= 13){
                user.history.shift(); 
            }
            user.history.push(history);
            await user.save();
            res.json(user);
        } else{
            res.status(404).json({message: 'User not found'});
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = addHistory