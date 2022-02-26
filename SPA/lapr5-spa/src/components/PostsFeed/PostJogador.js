import React, { useEffect } from 'react';

import { Box, Card, TextField, Button, List, DialogActions, Grid, Avatar, Typography, CardHeader, Paper, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Link } from 'react-router-dom'
import styled from "styled-components";

import { getIdJogadorAutenticado } from '../../utils/JogadorIDLocalStorage'
import { commentPost } from '../../Service/CommentPostService';
import { toCommentDto } from '../../dto/commentDto/commentDtoFactory'
import { buscarJogadorPeloId } from '../../Service/BuscarJogadorPeloIdService'
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedPost } from '../../redux/slice/SelecionarPostSlice/SelecionarPostSlice'
import { selectJogadorPostSelecionado } from '../../redux/slice/JogadorPostSelecionadoSlice/JogadorPostSelecionadoSlice'
import { setSelectedPost } from '../../redux/slice/SelecionarPostSlice/SelecionarPostSlice'
import reagirPost from '../../Service/ReagirPostService'
import reagirComment from '../../Service/ReagirCommentService'
import axios from 'axios'
import { BASE_URL_MDPC } from '../../apis/BaseUrl';

const PostJogador = () => {
    const dispatch = useDispatch();

    const User_ID = getIdJogadorAutenticado();
    const [loggedUser, setLoggedUser] = React.useState({});

    const selectedPost = useSelector(selectSelectedPost);
    const dadosJogadorPost = useSelector(selectJogadorPostSelecionado);

    const [textValue, setTextValue] = React.useState("");
    const [tagsValue, setTagsValue] = React.useState("");

    const [like, setLike] = React.useState(selectedPost.likes ? selectedPost.likes.length : 0);

    const [dislike, setDislike] = React.useState(selectedPost.dislikes ? selectedPost.dislikes.length : 0);

    useEffect(() => {
        axios.get(`${BASE_URL_MDPC}/api/posts/${selectedPost.id}`)
            .then(r => {
                dispatch(setSelectedPost(r.data))
                setLike(selectedPost.likes.length)
                setDislike(selectedPost.dislikes.length)
            })
            .catch((err) => alert("Ocorreu um erro, tentar novamente mais tarde"))

        buscarJogadorPeloId(setLoggedUser)
    }, []);

    const handleTextChange = (event) => { setTextValue(event.target.value); };
    const handleCancelButton = () => { setTextValue(""); }
    const handleTagsChanged = (event) => {
        event.preventDefault();
        setTagsValue(event.target.value)
    }

    const handleLikeButton = () => {
        //put reaction apis
        let reagirDtoPostLike = {
            parentId: selectedPost.id,
            authorId: User_ID,
            reaction: "LIKE"
        }
        reagirPost(reagirDtoPostLike)
        setLike(like + 1)
    }

    const handleDislikeButton = () => {
        let reagirDtoPostDislike = {
            parentId: selectedPost.id,
            authorId: User_ID,
            reaction: "DISLIKE"
        }
        reagirPost(reagirDtoPostDislike)
        setDislike(dislike + 1)
    }

    const handleLikeButtonComment = (comment) => {
        //put reaction apis
        let reagirDtoCommentLike = {
            parentId: comment.id,
            authorId: User_ID,
            reaction: "LIKE"
        }
        reagirComment(reagirDtoCommentLike)
        //setLike(like + 1)
    }

    const handleDislikeButtonComment = (comment) => {
        let reagirDtoCommentDislike = {
            parentId: comment.id,
            authorId: User_ID,
            reaction: "DISLIKE"
        }
        reagirComment(reagirDtoCommentDislike)

        //setDislike(dislike + 1)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!textValue || textValue.trim() === "") {
            alert("O comentário está vazio!")
            return
        }
        const Post_ID = selectedPost.id;
        const commentDto = toCommentDto(
            User_ID, Post_ID,
            textValue, tagsValue,
            loggedUser.nome,
            loggedUser.avatar
        );
        commentPost(commentDto);

    };

    const AvatarContainer = styled.div` display: flex; margin-bottom: 14px; & > * { margin: 4px; }`;
    const AvatarLabel = styled.div` display: flex; align-items: center; `;

    return (typeof selectedPost.comments !== 'undefined') ? (
        <div style={{ margin: 100, padding: 50 }}>
            <Paper style={{ padding: "40px 20px" }}>
                <Grid>
                    <AvatarContainer>
                        <AvatarLabel>
                            <Avatar style={{ marginRight: "14px" }} src={selectedPost.authorAvatar} />
                            <Typography style={{ fontWeight: 600 }} variant="body2">{selectedPost.authorNome}</Typography>
                        </AvatarLabel>
                    </AvatarContainer>

                    <p style={{ textAlign: "left" }}> {selectedPost.content}</p>

                    <Grid item direction="column" wrap='nowrap' >
                        <Button style={{ margin: 5, marginLeft: "5px" }} onClick={handleLikeButton}>
                            <ThumbUpIcon />{`${like === 0 ? '' : like}`}
                        </Button >
                        <Button style={{ margin: 5, marginRight: "5px" }} onClick={handleDislikeButton}>
                            <ThumbDownIcon />{`${dislike === 0 ? '' : dislike}`}
                        </Button>
                    </Grid>
                </Grid>

                <Grid>
                    <AvatarContainer>
                        <AvatarLabel>
                            <Avatar style={{ marginRight: "14px" }} src={loggedUser.avatar} />
                            <Typography style={{ fontWeight: 600 }} variant="body2">{loggedUser.nome}</Typography>
                        </AvatarLabel>
                    </AvatarContainer>

                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <Box m={2}>
                            <TextField
                                label="Comentário"
                                placeholder="Escreve um comentário..."
                                multiline
                                fullWidth
                                rows={2}
                                value={textValue}
                                onChange={handleTextChange}
                            />
                        </Box>
                        <Box m={2}>
                            <TextField
                                label="Tags"
                                placeholder="cafe,tortas,bolos,cha"
                                fullWidth
                                value={tagsValue}
                                onChange={handleTagsChanged}
                            />
                        </Box>
                        <Button onClick={handleSubmit} style={{ margin: 5 }} variant="contained" color="primary"> Comentar </Button>
                        <Button onClick={handleCancelButton} style={{ margin: 5 }} variant="outlined" color="primary"> Cancelar </Button>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />

                <h3 style={{ margin: 5, textAlign: "left", textDecorationLine: 'underline' }}>Comentários</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {selectedPost.comments.map(comment => (
                        <>
                            <Grid>
                                <Card>
                                    <AvatarContainer>
                                        <AvatarLabel>
                                            <Avatar style={{ marginRight: "14px" }} src={comment.avatar} />
                                            <Typography style={{ fontWeight: 600 }} variant="body2">{comment.name}</Typography>
                                        </AvatarLabel>
                                    </AvatarContainer>
                                    <Typography style={{ fontWeight: 600 }} variant="body2">{comment.text}</Typography>
                                    <br />
                                    <Box m={1}>
                                        <Grid container xs={9} spacing={0}>

                                            <Typography style={{ fontWeight: 600 }} variant="body2">Tags: </Typography>
                                            {comment.tags.map(tag => (
                                                <Typography style={{ fontWeight: 200 }} variant="body2">{tag}, </Typography>
                                            ))}

                                        </Grid>
                                    </Box>
                                    <Grid item direction="column" wrap='nowrap' >
                                        <Button style={{ margin: 5, marginLeft: "5px" }} onClick={() => handleLikeButtonComment(comment)}>
                                            <ThumbUpIcon />{`${comment.likes.length === 0 ? '' : comment.likes.length}`}
                                        </Button >
                                        <Button style={{ margin: 5, marginRight: "5px" }} onClick={() => handleDislikeButtonComment(comment)}>
                                            <ThumbDownIcon />{`${comment.dislikes.length === 0 ? '' : comment.dislikes.length}`}
                                        </Button>
                                    </Grid>
                                    <br />
                                </Card>
                                <br />
                                <Divider variant="inset" component="li" />
                            </Grid>
                        </>

                    ))}
                </List>
            </Paper >
        </div >

    ) : (

        <Box m={15}>
            <div>
                <h1>Deve escolher um post primeiro</h1>
                <Link to="/feed">
                    <Button style={{ margin: 5 }} variant="contained" color="primary">
                        Voltar ao Feed
                    </Button>
                </Link>
            </div>
        </Box>)
}

export default PostJogador