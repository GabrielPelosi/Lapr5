export const toPostagemRequestDto = (userId,content,tags) =>{
    return {
        authorId: userId,
        content: content,
        tags: tags.split(',')
    }
}
