const mongoose = require( 'mongoose' );

const institutionSchema = new mongoose.Schema({
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    }
});

const Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution;