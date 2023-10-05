import mongoose from 'mongoose';
import { mongoConnectUrl } from 'src/_config/db.config';

export async function initMongodbConnection() {
    await mongoose.connect(mongoConnectUrl);
}
