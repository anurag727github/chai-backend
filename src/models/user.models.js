import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true // for better searching
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true // for better searching
  },
  avatar: {
    type: String, // Cloudinary url we have in String format
    required: true
  },
  coverImage: {
    type: String // Cloudinary url we have in String format
  },
  watchHistory: [{
    type: Schema.Types.ObjectId,
    ref: "Video"
  }],
  password: {
    type: String,
    required: [true,"Password is required."]
  },
  refreshToken: {
    type: String,
  }
},{timestamps: true});

//encrypt password here
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10); //here 10 rounds hash function used
  next();
});

//check password here
userSchema.methods(isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password);
});

//Access token fromation 
userSchema.generateAccessToken = function (){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

//Refresh token formation
userSchema.generatRefreshToken = function (){
  return jwt.sign(
    {
      _id: this._id
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User", userSchema);