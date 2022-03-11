const mongoose = require("mongoose");
// Schema

const MessageSchema = mongoose.Schema({
  from: { type: String, required: false },
  to: { type: String, required: false },
  message: { type: String, required: false },
  createdAt: { type: Date, required: false, default: Date.now },
});

MessageSchema.statics = {
  get: function (query, callback) {
    this.findOne(query).exec(callback);
  },
  getAll: function (query, callback) {
    this.find(query).exec(callback);
  },
  updateById: function (id, updateData, callback) {
    this.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true },
      callback
    );
  },
  removeById: function (removeData, callback) {
    this.findOneAndRemove(removeData, callback);
  },
  create: function (data, callback) {
    const message = new this(data);
    message.save(callback);
  },
};

const Message = (module.exports = mongoose.model("Message", MessageSchema));
