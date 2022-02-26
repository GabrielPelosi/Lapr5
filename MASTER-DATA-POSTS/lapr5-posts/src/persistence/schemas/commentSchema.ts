import { ICommentPersistence } from '../../dataschema/ICommentPersistence';
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        userId: { type: String },
        name: { type: String },
        avatar: { type: String },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }],
        dislikes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dislike'
        }],
        text: { type: String },
        tags: [{ type: String }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICommentPersistence & mongoose.Document>('Comment', CommentSchema);