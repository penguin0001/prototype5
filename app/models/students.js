const mongoose = require( 'mongoose' );
const studentRelSchema = new mongoose.Schema({
    educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

const StudentRel = mongoose.model('StudentRel', studentRelSchema);

module.exports = StudentRel;