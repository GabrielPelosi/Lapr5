import { Result } from "../../core/logic/Result";
import ICommentDTO from "../../dto/comments/ICommentDTO";
import ICreateReactionDto from '../../dto/reactions/ICreateReactionDto'

export default interface ICommentService  {
  createComment(commentDTO: ICommentDTO): Promise<Result<ICommentDTO>>;
  //getAllCommentsByPostId() : Promise<Result<ICommentDTO[]>>;
  addReaction(creationReactionDto: ICreateReactionDto): Promise<Result<ICommentDTO>>;

}