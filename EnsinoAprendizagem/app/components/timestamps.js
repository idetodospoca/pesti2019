function timestampsPlugin(schema, options) {
  schema.add({
    createdAt: {
      type    : Date,
      default : Date.now
    },
    updatedAt: {
      type    : Date,
      default : Date.now
    }
  });

  schema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
  });
}

module.exports = timestampsPlugin;
