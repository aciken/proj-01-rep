const collection = require('../DataBase/MongoDB');

const linkExist = async (req, res) => {
    try {
        const { changablePart } = req.body;
        const user = await collection.findOne({ restartCode: changablePart });
        if (user) {
            res.send(false);
        } else {
            res.send(true);
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
}

module.exports = linkExist;