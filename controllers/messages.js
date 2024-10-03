const Message = require('../models/message');
const User = require('../models/user');
const { io } = require('../index');

const getChat = async (req, res) => {
    const myUID = req.uid;
    const messageFrom = req.params.from;

    const last30 = await Message.find({
        $or: [{ to: myUID, from: messageFrom }, { to: messageFrom, from: myUID }]
    }).sort(createdAt = 'desc').limit(30);

    await res.json(
        {
            ok: true,
            messages: last30
        }
    )
}

module.exports = {
    getChat
}


