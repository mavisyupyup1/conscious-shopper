const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://mavisyupyup1:POx58807246!@cluster0.5zzwx.mongodb.net/project-3?' || 'mongodb://localhost:27017/project-3', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project-3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
