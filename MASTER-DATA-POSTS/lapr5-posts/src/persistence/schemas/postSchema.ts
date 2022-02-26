import { IPostPersistence } from '../../dataschema/IPostPersistence';
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        authorId: { type: String },
        content: { type: String },
        tags: [{ type: String }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }],
        dislikes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dislike'
        }],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],//mudar futuramente para integrar comentarios.
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPostPersistence & mongoose.Document>('Post', PostSchema);
