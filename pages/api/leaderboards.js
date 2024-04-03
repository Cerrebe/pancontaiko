import { connectToDatabase } from "../../libs/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase(req, res)
    
    const data = await db.collection("pantaiko").find({}).limit(20).toArray();

    res.json(data);
}