import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ICommentPersistence } from '../dataschema/ICommentPersistence';

import { Comment } from "../domain/comments/comment";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import ICommentDTO from "../dto/comments/ICommentDTO";
import { LikeMap } from "./LikeMap";
import { DislikeMap } from "./DislikeMap";

export class CommentMap extends Mapper<Comment> {

    public static toDTO(comment: Comment): ICommentDTO {
        //console.log(comment.id)
        return {
            id: comment.id.toString(),
            userId: comment.userId,
            likes: comment.likes.map(react => LikeMap.toDTO(react)),
            dislikes: comment.dislikes.map(dis => DislikeMap.toDTO(dis)),
            text: comment.text,
            name: comment.name,
            avatar:comment.avatar,
            tags: comment.tags,
        } as ICommentDTO;
    }

    public static toDomain(comment: any | Model<ICommentPersistence & Document>): Comment {
        const commentOrError = Comment.create(
            comment,
            new UniqueEntityID(comment.domainId)
        );

        commentOrError.isFailure ? console.log(commentOrError.error) : '';

        return commentOrError.isSuccess ? commentOrError.getValue() : null;
    }

    public static toPersistence(comment: Comment): any {
        return {
            domainId: comment.id.toString(),
            userId: comment.userId,
            likes: comment.likes,
            dislikes: comment.dislikes,
            name:comment.name,
            avatar:comment.avatar,
            text: comment.text,
            tags: comment.tags,
        }
    }
}