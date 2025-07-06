import mongoose from "mongoose";

const connect = (url) => {
  mongoose.connect(url).then(() => {
    console.log("Database connected");
  });
};

export default connect;
