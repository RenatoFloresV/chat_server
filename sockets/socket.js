const { io } = require('../index');
const { verifyJWT } = require('../helpers/jwt');
const { userConnected, disconnectUser, saveMessage } = require('../controllers/socket');


// Socket messages
io.on('connection', (client) => {
    console.log('client connected');

    const [valid, uid] = verifyJWT(client.handshake.headers['x-token']);
    if (!valid) {
        console.log('Invalid token');
        return client.disconnect();
    }

    // User connected
    userConnected(uid);

    // User enter in room
    client.join(uid);

    // Listen to private messages
    client.on('private-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('private-message', payload)
    });

    // Emit message to client
    client.on('emit-message', (payload) => {
        console.log('emit-message', payload);
        client.broadcast.emit('new-message', {
            id: client.id,
            ...payload
        });
    });

    // global room
    io.of('/').emit('global-room', {
        event: 'user-connected',
        uid
    });

    // User left room
    client.on('leave-room', (room) => {
        client.leave(room);
    });

    // User joined room
    client.on('join-room', (room) => {
        client.join(room);
    });

    // User changed name
    client.on('change-name', (payload) => {
        console.log('change-name', payload);
        client.broadcast.emit('user-changed-name', {
            uid,
            newName: payload.newName
        });
    });

    // User typing in chat
    client.on('typing', (payload) => {
        console.log('typing', payload);
        client.broadcast.emit('user-typing', payload);
    });

    // User disconnected
    client.on('disconnect', () => {
        disconnectUser(uid);
    });



    client.on('disconnect', () => {
        console.log('client disconnected');
    });

});

