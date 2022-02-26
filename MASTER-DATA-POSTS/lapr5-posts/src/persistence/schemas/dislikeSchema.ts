import mongoose from 'mongoose';
import {IReactionPersistence} from '../../dataschema/IReactionPersistence'

const DislikeSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        authorId: { type: String },
        reaction: {type: String},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IReactionPersistence & mongoose.Document>('Dislike', DislikeSchema);