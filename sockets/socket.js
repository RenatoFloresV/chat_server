const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band(  'Queen' ));
bands.addBand(new Band( 'The Beatles' ));
bands.addBand(new Band( 'Led Zeppelin' ));
bands.addBand(new Band( 'Metallica' ));

// Socket messages
io.on('connection', (client) => {
    console.log('client connected');

    client.emit('initial-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('client disconnected');
    });

    // client.on('message', (payload) => {
    //     console.log('message', payload);
    //     io.emit('message', {
    //         id: client.id,
    //         ...payload
    //     });
    // });

    // client.on('emit-message', (payload) => {
    //     console.log('emit-message', payload);

    //     client.broadcast.emit('new-message', {
    //         id: client.id,
    //         ...payload
    //     });

    // });

    // client.on('vote', function(payload) {
    //     console.log('vote', payload);
    //     bands.voteBand(payload.id);
    //     io.emit('initial-bands', bands.getBands());
    // });

    // client.on('add-band', function (payload) {
    //     console.log('add-band', payload);
    //     bands.addBand(new Band(payload.name));
    //     io.emit('initial-bands', bands.getBands());
    // });

    // client.on('delete-band', function (payload) {
    //     console.log('delete-band', payload);
    //     bands.deleteBand(payload.id);
    //     io.emit('initial-bands', bands.getBands());
    // });

});

