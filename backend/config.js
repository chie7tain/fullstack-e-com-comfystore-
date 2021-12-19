import dotenv from "dotenv";

dotenv.config();

export default {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_Secret: process.env.JWT_Secret,
};
