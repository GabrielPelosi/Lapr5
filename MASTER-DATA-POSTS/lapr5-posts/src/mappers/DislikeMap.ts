import { Dislike } from './../domain/reactions/dislike';
import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';

import IDislikeDTO from "../dto/reactions/IDislikeDTO";

export class DislikeMap extends Mapper<Dislike> {

    public static toDTO(dislike: Dislike): IDislikeDTO {
        return {
            userId: dislike.authorId,
            reaction: dislike.reaction
        } as IDislikeDTO;
    }

    public static toDomain(dislike: any | Model<Document>): Dislike {
        const reactionOrError = Dislike.create(
            dislike,
        );

        reactionOrError.isFailure ? console.log(reactionOrError.error) : '';

        return reactionOrError.isSuccess ? reactionOrError.getValue() : null;
    }

    public static toPersistence(dislike: Dislike): any {
        return {
            domainId: dislike.id.toString(),
            userId: dislike.authorId,
            reaction: dislike.reaction
        }
    }
}