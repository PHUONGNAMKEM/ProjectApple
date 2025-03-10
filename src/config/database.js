require('dotenv').config();
const mongoose = require('mongoose');


const dbState = [{
  value: 0,
  label: "disconnected"
},
{
  value: 1,
  label: "connected"
},
{
  value: 2,
  label: "connecting"
},
{
  value: 3,
  label: "disconnecting"
}];


const connection = async () => {
  const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
  }

  await mongoose.connect(process.env.DB_HOST, options);
  const state = Number(mongoose.connection.readyState); // mongoose.connection.readyState ở đây trả về kiểu số rồi, tương ứng với các số 0, 1, 2, 3 như trên để cho biết trạng thái hiện tại của kến nối đến db MongoDB
  console.log(dbState.find(f => f.value == state).label, "to db"); // connected to db
}

module.exports = connection;