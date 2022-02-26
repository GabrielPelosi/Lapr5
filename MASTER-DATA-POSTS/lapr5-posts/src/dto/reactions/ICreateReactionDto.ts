export default interface ICreateReactionDto {
  parentId: string; //id do post ou comentário
  authorId: string;
  reaction: string;
}