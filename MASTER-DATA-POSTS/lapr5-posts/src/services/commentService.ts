import { Service, Inject } from 'typedi';
import config from "../../config";
import { Comment } from "../domain/comments/comment";
import ICommentRepo from '../services/IRepos/ICommentRepo';
import ICommentService from './IServices/ICommentService';
import { Result } from "../core/logic/Result";
import { CommentMap } from "../mappers/CommentMap";
import ICommentDTO from '../dto/comments/ICommentDTO';
import IPostRepo from './IRepos/IPostRepo';
import ICreateReactionDto from '../dto/reactions/ICreateReactionDto'
import { Like } from '../domain/reactions/like';
import { Dislike } from '../domain/reactions/dislike';

@Service()
export default class CommentService implements ICommentService {

    constructor(
        @Inject(config.repos.comment.name) private commentRepo: ICommentRepo,
        @Inject(config.repos.post.name) private postRepo: IPostRepo
    ) { }

    public async createComment(commentDTO: ICommentDTO): Promise<Result<ICommentDTO>> {
        try {
            const commentOrError = await Comment.create(commentDTO);
            if (commentOrError.isFailure) {
                return Result.fail<ICommentDTO>(commentOrError.errorValue());
            }

            const commentResult = commentOrError.getValue();

            const post = await this.postRepo.findByDomainId(commentDTO.postId);

            await this.commentRepo.save(commentResult);
            await this.postRepo.addComment(post, commentResult);

            const commentDTOResult = CommentMap.toDTO(commentResult) as ICommentDTO;
            return Result.ok<ICommentDTO>(commentDTOResult)
        } catch (e) {
            throw e;
        }
    }

    //getAllCommentsByPostId()

    public async addReaction(createReaction: ICreateReactionDto): Promise<Result<ICommentDTO>> {
        try {
            const comment = await this.commentRepo.findByDomainId(createReaction.parentId);
            if(createReaction.reaction === 'LIKE'){
                const like = await Like.create(createReaction);
                if (like.isFailure) {
                    return Result.fail<ICommentDTO>(like.errorValue());
                }
                const reactionResult = like.getValue();
                await this.commentRepo.addReactionLike(comment, reactionResult);
                comment.addLike(reactionResult);
    
                const commentDTOResult = CommentMap.toDTO(comment) as ICommentDTO;
    
                return Result.ok<ICommentDTO>(commentDTOResult)

            }else{
                const dislike = await Dislike.create(createReaction);

                if (dislike.isFailure) {
                    return Result.fail<ICommentDTO>(dislike.errorValue());
                }
                const reactionResult = dislike.getValue();
                await this.commentRepo.addReactionDislike(comment, reactionResult);
                comment.addDislike(reactionResult);
    
                const commentDTOResult = CommentMap.toDTO(comment) as ICommentDTO;
    
                return Result.ok<ICommentDTO>(commentDTOResult)

            }
            
        } catch (e) {
            throw e;
        }
    }
}