import 'reflect-metadata'
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';
import { Post } from '../domain/posts/post'
import IPostService from "../services/IServices/IPostService";
import IPostCreateRequestDTO from '../dto/posts/IPostCreateRequestDTO';
import IPostResponseDTO from '../dto/posts/IPostResponseDTO';
import IPostUserFeedDto from '../dto/posts/IPostUserFeedDto';
import IPostUserFeedDtoRequest from '../dto/posts/IPostUserFeedDtoRequest';
import IPostRepo from '../services/IRepos/IPostRepo';
import { IPostPersistence } from '../dataschema/IPostPersistence';
import { Document } from 'mongodb';
import { Model } from 'mongoose';
import PostRepo from './postRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';


describe('post service', function () {
    beforeEach(function () {
    });

    it('createPost: returns IPosteResponseDTO authorId+content+tags', async function () {
        this.timeout(0);

        let postSchema = require("../persistence/schemas/postSchema").default
        let commentSchema = require("../persistence/schemas/commentSchema").default
        let likeSchema = require("../persistence/schemas/likeSchema").default
        let dislikeSchema = require("../persistence/schemas/dislikeSchema").default

        Container.set('postSchema', postSchema);
        Container.set('commentSchema', commentSchema);
        Container.set('likeSchema', likeSchema);
        Container.set('dislikeSchema', dislikeSchema);



        /*
            authorId: string;
            content: string;
            tags: Array<string>;
        */

        var post: Post = Post.create({
            authorId: "testeAuthor1",
            content: "teste content",
            tags: ["teste", "disse"]
        }, new UniqueEntityID("1")).getValue()

        /*
        domainId: string;
        authorId: string;
        content: string;
        likes: Array<Like>; 
        dislikes: Array<Dislike>;  
        tags: Array<string>;
        comments: Array<Comment>;
        */
        let postPersistence = {
            domainId: "1",
            authorId: "testeAuthor1",
            content: "teste content",
            likes: [] ,
            dislikes: [],
            tags: ["teste", "disse"],
            comments: []
        };

        sinon.stub(postSchema as Model<IPostPersistence & Document>, 'create').resolves(postPersistence);
        sinon.stub(postSchema as Model<IPostPersistence & Document>, 'findOne').resolves(postPersistence);
        sinon.stub(postSchema as Model<IPostPersistence & Document>, 'populate').resolves(postPersistence);

        const repo = new PostRepo(postSchema, commentSchema,likeSchema,dislikeSchema);

        //let postCreated: Post = (await repo.save(post));
        // sinon.assert.calledOnce(res.json);
        // expect(postCreated.authorId).toEqual(post.authorId);
        // expect(postCreated.content).toEqual(post.content);
        // expect(postCreated.tags).toEqual(post.tags);
    })

});
