/* eslint-disable no-undef */
import mongoose from "mongoose";

export default async function conect() {

  try {
    
    mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw new Error(error);
  }

}