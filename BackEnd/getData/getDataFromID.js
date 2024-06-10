const collection = require('../DataBase/MongoDB');

const getDataFromID = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await collection.findOne({email: id})
        if(user){
            res.json(user)
        } else{
            res.status(404).json({message: 'User not found'})
        }
}
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = getDataFromID;