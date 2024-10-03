const User = require('../models/user')
const Message = require('../models/message')

const userConnected = async (uid = '') => {
    const user = await User.findById(uid);

    if (!user) return;
    user.online = true;
    await user.save();
    // await client.emit('user-connected', uid);

}

const disconnectUser = async (uid = '') => {
    // await client.emit('user-disconnected', uid);
    const user = await User.findById(uid);
    if (!user) return;
    user.online = false;
    await user.save();
}

const saveMessage = async (payload) => {

    const newMessage = new Message(payload);

    await newMessage.save();
}

module.exports = {
    userConnected,
    disconnectUser,
    saveMessage,
}