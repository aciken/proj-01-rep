const collection = require('../DataBase/MongoDB');

const updateCredits = async (req, res) => {
    try {
        const { id, credits } = req.body;
        const user = await collection.findOne({email: id})
        if(user){
            const updatedUser = await collection.updateOne({email: id}, {credits: credits})
            res.json(updatedUser)
        } else{
            res.status(404).json({message: 'User not found'})
        }
}
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = updateCredits;
            