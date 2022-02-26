import { Service, Inject } from 'typedi';
import config from "../../config";
import { Post } from "../domain/posts/post";
import IPostRepo from '../services/IRepos/IPostRepo';
import IPostService from './IServices/IPostService';
import { Result } from "../core/logic/Result";
import { PostMap } from "../mappers/PostMap";
import IPostCreateRequestDto from '../dto/posts/IPostCreateRequestDTO';
import IPostResponseDto from '../dto/posts/IPostResponseDTO';
import ICreateReactionDto from '../dto/reactions/ICreateReactionDto'
import { Like } from '../domain/reactions/like';
import { Dislike } from '../domain/reactions/dislike';
import IPostUserFeedDto from '../dto/posts/IPostUserFeedDto'
import IPostUserFeedDtoRequest from '../dto/posts/IPostUserFeedDtoRequest'
const axios = require('axios');

@Service()
export default class PostService implements IPostService {

  constructor(
    @Inject(config.repos.post.name) private postRepoInstance: IPostRepo
  ) { }

  public async createPost(createPostDto: IPostCreateRequestDto): Promise<Result<IPostResponseDto>> {
    try {

      const postOrError = await Post.create(createPostDto);


      if (postOrError.isFailure) {

        return Result.fail<IPostResponseDto>(postOrError.errorValue());
      }

      const postResult = postOrError.getValue();

      await this.postRepoInstance.save(postResult);

      const postResponseDTOResult = PostMap.toDTO(postResult) as IPostResponseDto;
      return Result.ok<IPostResponseDto>(postResponseDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async getAll(): Promise<Result<IPostResponseDto[]>> {
    const post_list = await this.postRepoInstance.findAll();
    for (let i = 0; i < post_list.length; i++) {
      for (let j = 0; j < post_list[i].comments.length; j++) {
        console.log(post_list[i].comments[j].id)
      }
    }
    return Result.ok(post_list.map(result => PostMap.toDTO(result)))
  }

  public async getUserFeed(user: IPostUserFeedDtoRequest): Promise<Result<IPostUserFeedDto[]>> {
    var id;
    var avatar;
    var nome;
    await axios.get(`https://lapr5-g26.herokuapp.com/api/Jogadores/procurarjogador/nome/${user.authorName}`)
      .then(response => {
        id = response.data.id;
        avatar = response.data.avatar;
        nome = response.data.nome; 
      }).catch(() => {
        throw new Error("Usuário não encontrado!")
      });
    const post_list = await this.postRepoInstance.getUserFeed(id);
    return Result.ok(post_list.map(result => PostMap.toUserFeedDTO(result,nome,avatar)))
  }

  public async addReaction(createReaction: ICreateReactionDto): Promise<Result<IPostResponseDto>> {
    try {

      const post = await this.postRepoInstance.findByDomainId(createReaction.parentId);

      if (createReaction.reaction === 'LIKE') {
        const reaction = await Like.create(createReaction);

        if (reaction.isFailure) {
          return Result.fail<IPostResponseDto>(reaction.errorValue());
        }
        const reactionResult = reaction.getValue();
        await this.postRepoInstance.addReactionLike(post, reactionResult);
        post.addLike(reactionResult);

        const postResponseDTOResult = PostMap.toDTO(post) as IPostResponseDto;

        return Result.ok<IPostResponseDto>(postResponseDTOResult)
      } else {
        const reaction = await Dislike.create(createReaction);

        if (reaction.isFailure) {
          return Result.fail<IPostResponseDto>(reaction.errorValue());
        }
        const reactionResult = reaction.getValue();
        await this.postRepoInstance.addReactionDislike(post, reactionResult);
        post.addDislike(reactionResult);

        const postResponseDTOResult = PostMap.toDTO(post) as IPostResponseDto;

        return Result.ok<IPostResponseDto>(postResponseDTOResult)
      }

    } catch (e) {
      throw e;
    }
  }

  public async findByDomainId(domainId: string): Promise<Result<IPostResponseDto>>{
    const post = await this.postRepoInstance.findByDomainId(domainId);
    var avatar;
    var nome;
    await axios.get(`https://lapr5-g26.herokuapp.com/api/Jogadores/${post.authorId}`)
      .then(response => {
        avatar = response.data.avatar; 
        nome = response.data.nome; 
      }).catch(() => {
        throw new Error("Usuário não encontrado!")
      });
    return Result.ok(PostMap.toUserFeedDTO(post,nome,avatar))
  }

  public async deletePostsFromUser(userId: string) : Promise<Result<IPostResponseDto>>{
    const a = await this.postRepoInstance.deletePostsCommentsFromUser(userId);
    return Result.ok();
  }

}