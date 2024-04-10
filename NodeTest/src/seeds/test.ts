import { fakerVI as faker } from "@faker-js/faker";
import mongoose from "mongoose";
import User from "../models/Users.model";

const MONGO_CONNECT = `mongodb://localhost:27017/Batch37`;
const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
console.log(MONGO_CONNECT);

mongoose
  .connect(MONGO_CONNECT, mongooseDbOptions)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
async function clearCollections() {
  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map(async (collection) => {
      await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
    })
  );
}
async function run() {
  clearCollections();

  for (let i = 1; i <= 5; i++) {
    const fPhone = faker.helpers.fromRegExp(/0[3|5|7|8|9][0-9]{8}/i);
    const Fakeuser = new User({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: fPhone,
    });
    Fakeuser.save();
    console.log(`Create User successfully !`);
  }
}
console.log("Gen Data Test ....");
try {
  run();
} catch (error) {
  console.log(error);
}
