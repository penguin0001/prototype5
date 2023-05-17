const mongoose = require( 'mongoose' );
// LINK STUDENTS TO EDUCATORS
const studentLinkSchema = new mongoose.Schema({
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

const StudentLink = mongoose.model('StudentLink', studentLinkSchema);

module.exports = StudentLink;