import mongoose from 'mongoose';


export async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://Project:Project1234@nodepro.5bbbxro.mongodb.net/');
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
