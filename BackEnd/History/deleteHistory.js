const collection = require('../DataBase/MongoDB');

const deleteHistory = async (req, res) => {
    try {
        const {id, index} = req.body;
        const user = await collection.findOne({ email: id });
        if (user) {
            user.history.splice(index, 1);
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}

module.exports = deleteHistory