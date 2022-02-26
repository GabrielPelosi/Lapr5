import { Like } from './../domain/reactions/like';
import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';

import ILikeDTO from "../dto/reactions/ILikeDTO";

export class LikeMap extends Mapper<Like> {

    public static toDTO(like: Like): ILikeDTO {
        return {
            userId: like.authorId,
            reaction: like.reaction
        } as ILikeDTO;
    }

    public static toDomain(like: any | Model<Document>): Like {
        const reactionOrError = Like.create(
            like,
        );

        reactionOrError.isFailure ? console.log(reactionOrError.error) : '';

        return reactionOrError.isSuccess ? reactionOrError.getValue() : null;
    }

    public static toPersistence(like: Like): any {
        return {
            domainId: like.id.toString(),
            userId: like.authorId,
            reaction: like.reaction
        }
    }
}