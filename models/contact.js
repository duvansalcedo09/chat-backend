const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, required: false, default: Date.now },
});

ContactSchema.statics = {
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
    const contact = new this(data);
    contact.save(callback);
  },
};

const Contact = (module.exports = mongoose.model("Contact", ContactSchema));
