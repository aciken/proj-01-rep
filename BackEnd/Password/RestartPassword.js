const collection = require('../DataBase/MongoDB');

const RestartPassword = async (req, res) => {
    try {
        const { changablePart, password } = req.body;
        const user = await collection.findOne({ restartCode: changablePart });
        if (user) {
            user.password = password;
            user.restartCode = '';
            await user.save();
            res.send({ message: 'Password changed' });
        } else {
            res.send({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
}

module.exports = RestartPassword;