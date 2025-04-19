module.exports = {
  up: async (mongoose:any) => {
    // Code to apply the migration
    // Example: await mongoose.connection.db.collection('users').updateMany({}, { $set: { age: 0 } });
  },
  down: async (mongoose:any) => {
    // Code to undo the migration
    // Example: await mongoose.connection.db.collection('users').updateMany({}, { $unset: { age: "" } });
  }
};