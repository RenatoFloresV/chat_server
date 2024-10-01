const Band = require('./band');
class Bands {
    constructor() {
        this.bands = [];
    }

    addBand(band = new Band) {
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    deleteBand(id = null) {
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }

    updateBand(id = null, updatedBand = null) {
        this.bands = this.bands.map(band => band.id === id? updatedBand : band);
        return this.bands;
    }

    voteBand(id = null) {
        this.bands = this.bands.map(band => band.id === id? {...band, votes: band.votes + 1} : band);
        return this.bands;
    }
}

module.exports = Bands;