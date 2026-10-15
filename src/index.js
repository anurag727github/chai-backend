//require('dotenv').config({path : './env'}) 
//not required to also import here because we have directly loaded the dotenv file usinf the npm run dev script which includes it already

import connectDB from "./db/index.js";



connectDB()



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