import mongoose from "mongoose"

declare global {
    var mongoose: any
}

const mongoConnString = process.env.MONGODB_URI;
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) return cached.conn

    if (!mongoConnString) {
        throw new Error("MONGODB URI not defined for environment. No found database connection point.")
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongoConnString, {dbName: "mexico-shop"}).then((mongoose) => {
            return mongoose
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect;