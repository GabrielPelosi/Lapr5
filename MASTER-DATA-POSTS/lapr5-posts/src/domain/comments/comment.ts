import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { CommentId } from "./commentId";
import ICommentDTO from "../../dto/comments/ICommentDTO";
import { Like } from "../reactions/like";
import { Dislike } from "../reactions/dislike";
import { ICommentPersistence } from "../../dataschema/ICommentPersistence";
import { Document, Model } from 'mongoose';


interface CommentProps {
    userId: string;
    likes: Array<Like>;
    dislikes: Array<Dislike>;
    text: string;
    avatar: string,
    name: string,
    tags: Array<string>;
}

export class Comment extends AggregateRoot<CommentProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get commentId(): CommentId {
        return new CommentId(this.commentId.toValue());
    }

    get userId(): string {
        return this.props.userId;
    }

    get likes(): Array<Like> {
        return this.props.likes;
    }

    get dislikes(): Array<Dislike> {
        return this.props.dislikes;
    }


    get text(): string {
        return this.props.text;
    }

    get avatar(): string {
        return this.props.avatar;
    }

    get name(): string {
        return this.props.name;
    }

    get tags(): Array<string> {
        return this.props.tags;
    }

    public addLike(like: Like): void {
        this.props.likes.push(like);
    }

    public addDislike(dislike: Dislike): void {
        this.props.dislikes.push(dislike);
    }

    private constructor(props: CommentProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(commentDTO: ICommentDTO, id?: UniqueEntityID): Result<Comment> {
        const userId = commentDTO.userId;
        const likes = []; //mudar??
        const dislikes = [];
        const text = commentDTO.text;
        const tags = commentDTO.tags;
        const name = commentDTO.name;
        const avatar = commentDTO.avatar;

        if (!!text === false || text.length === 0) {
            return Result.fail<Comment>('Must write text to comment')
        } else {
            const comment = new Comment({
                userId: userId,
                likes: likes,
                dislikes:dislikes,
                text: text,
                tags: tags,
                name: name,
                avatar: avatar
            }, id);
            return Result.ok<Comment>(comment)
        }
    }

    public static createExisted(comment: any | Model<ICommentPersistence & Document>): Result<Comment> {
        const userId = comment.userId;
        const domainId = comment.domainId;
        const likes = comment.likes; //mudar??
        const dislikes = comment.dislikes;
        const text = comment.text;
        const tags = comment.tags;
        const name = comment.name;
        const avatar = comment.avatar;
    
    
        if (!!text === false || text.length === 0) {
          return Result.fail<Comment>('Must provide a role name')
        } else {
          const c = new Comment({ userId: userId, text: text, tags: tags, likes: likes, dislikes:dislikes,avatar:avatar,name:name}, domainId);
          return Result.ok<Comment>(c)
        }
      }
}
