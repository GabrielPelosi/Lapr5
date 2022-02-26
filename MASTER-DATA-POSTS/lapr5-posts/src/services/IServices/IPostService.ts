import { Result } from "../../core/logic/Result";
import IPostCreateRequestDto from "../../dto/posts/IPostCreateRequestDTO";
import IPostResponseDto from "../../dto/posts/IPostResponseDTO";
import ICreateReactionDto from '../../dto/reactions/ICreateReactionDto'
import  IPostUserFeedDto  from "../../dto/posts/IPostUserFeedDto";
import  IPostUserFeedDtoRequest  from "../../dto/posts/IPostUserFeedDtoRequest";

export default interface IPostService {
  createPost(createPostDto: IPostCreateRequestDto): Promise<Result<IPostResponseDto>>;
  getAll() : Promise<Result<IPostResponseDto[]>>;
  getUserFeed(user: IPostUserFeedDtoRequest):Promise<Result<IPostResponseDto[]>>;
  addReaction(creationReactionDto: ICreateReactionDto): Promise<Result<IPostResponseDto>>;
  findByDomainId(domainId: string): Promise<Result<IPostResponseDto>>;
  deletePostsFromUser(userId: string): Promise<Result<IPostResponseDto>>;
}
