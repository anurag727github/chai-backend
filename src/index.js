//require('dotenv').config({path : './env'}) 
//not required to also import here because we have directly loaded the dotenv file usinf the npm run dev script which includes it already

import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import express from "express";
import cors from "cors"

const app = express();

app.use(cors({origin:"*", Credential: true}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("Public"));
app.use(cookieParser);

connectDB()
.then(() => {
  app.on("ERROR : ", (error) =>{
    console.log("ERRR", error)
    throw error
  });
  app.listen(process.env.PORT || 8000, () =>{
    console.log(`Server is running on port: ${process.env.PORT}`)
  });
})
.catch((err) => {
  console.log("MONGO db connection failed !!!", err)
})


/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MANGODB_URI}/${DB_NAME}`);
    app.on("error" , (error) => {
      console.log("Error ", error);
      throw error;
    });
    app.listen(process.env.PORT, () =>{
      console.log(`App is listening on PORT ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error ", error);
    throw error;
  }
})()
*/