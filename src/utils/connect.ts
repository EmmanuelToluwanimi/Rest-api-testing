import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {

    const dbUri = config.get<string>("dbUri");

    try {

        if(!dbUri) {
            throw new Error("Provide a valid dbUri");
        }

        await mongoose.connect(dbUri);
        logger.info("Connected to MongoDB");

        return;

    } catch (error) {
        logger.error('Error connecting to mongoDB: ' + error);
        process.exit(1);
    }
    
}

export default connect;