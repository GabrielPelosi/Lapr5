import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPostPersistence } from '../dataschema/IPostPersistence';

import { Post } from "../domain/posts/post";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IPostResponseDto from "../dto/posts/IPostResponseDTO";
import { CommentMap } from "./CommentMap";
import { LikeMap } from "./LikeMap";
import { DislikeMap } from "./DislikeMap";
import IPostUserFeedDto from '../dto/posts/IPostUserFeedDto'

export class PostMap extends Mapper<Post> {

    public static toUserFeedDTO(post:Post, nome: string, avatar: string) : IPostUserFeedDto{
        return {
            id: post.id.toString(),
            authorId: post.authorId,
            authorName: nome,
            authorAvatar: avatar,
            content: post.content,
            tags: post.tags,
            likes:post.likes.map(reaction => LikeMap.toDTO(reaction)),
            dislikes:post.dislikes.map(reaction => DislikeMap.toDTO(reaction)),
            comments:post.comments.map(comment => CommentMap.toDTO(comment)),
        } as IPostUserFeedDto; 
    }

    public static toDTO(post: Post): IPostResponseDto {
        return {
            id: post.id.toString(),
            authorId: post.authorId,
            content: post.content,
            tags: post.tags,
            likes:post.likes.map(reaction => LikeMap.toDTO(reaction)),
            dislikes:post.dislikes.map(reaction => DislikeMap.toDTO(reaction)),
            comments:post.comments.map(comment => CommentMap.toDTO(comment)),
        } as IPostResponseDto;
    }

    public static toDomain(post: any | Model<IPostPersistence & Document>): Post {
        const postOrError = Post.create(
            post,
            new UniqueEntityID(post.domainId)
        );

        postOrError.isFailure ? console.log(postOrError.error) : '';

        return postOrError.isSuccess ? postOrError.getValue() : null;
    }

    public static toPersistence(post: Post): any {
        return {
            domainId: post.id.toString(),
            authorId: post.authorId,
            content: post.content,
            likes:post.likes,
            dislikes:post.dislikes,
            tags: post.tags,
            comments: post.comments,
        }
    }
}