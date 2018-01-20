import mongoose from 'mongoose';

function newId() {
  const num = Math.round(Math.random() * 999999);
  const id = `mz-${num}`;
  return id;
}

const migrationSchema = new mongoose.Schema({
  _id: { type: String, default: newId() },
  name: { type: String },
  status: { type: String, default: 'NOT_RUN' }
});

const Migration = mongoose.model('Migration', migrationSchema, 'Migration');

module.exports = Migration;
