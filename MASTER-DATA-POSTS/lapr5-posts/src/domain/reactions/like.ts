import { AggregateRoot } from "../../core/domain/AggregateRoot";

import { Result } from "../../core/logic/Result";
import ICreateReactionDto from "../../dto/reactions/ICreateReactionDto";


interface LikeProps {
    parentId: string,
    authorId: string
    reaction: string;
}

export class Like extends AggregateRoot<LikeProps> {

    get postId(): string {
        return this.props.parentId;
    }

    get authorId(): string {
        return this.props.authorId;
    }

    get reaction(): string {
        return this.props.reaction;
    }

    private constructor(props: LikeProps) {
        super(props);
    }

    public static create(reactionDTO: ICreateReactionDto): Result<Like> {
        const authorId = reactionDTO.authorId;
        const reaction = reactionDTO.reaction;
        const parentId = reactionDTO.parentId;
        if (!!reaction === false || reaction.length === 0) {
            return Result.fail<Like>('Must like or dislike!')
        } else {
            const react = new Like({parentId:parentId, authorId: authorId, reaction: reaction });
            return Result.ok<Like>(react)
        }
    }
}
