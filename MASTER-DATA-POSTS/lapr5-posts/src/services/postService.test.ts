import 'reflect-metadata'
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';
import {Post} from '../domain/posts/post'
import IPostService from "../services/IServices/IPostService";
import PostService from "./postService";
import IPostCreateRequestDTO from '../dto/posts/IPostCreateRequestDTO';
import IPostResponseDTO from '../dto/posts/IPostResponseDTO';
import IPostUserFeedDto from '../dto/posts/IPostUserFeedDto';
import IPostUserFeedDtoRequest from '../dto/posts/IPostUserFeedDtoRequest';
import IPostRepo from './IRepos/IPostRepo';


describe('post service', function () {
    beforeEach(function () {
    });

    /*
        authorId: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array()
    */
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

        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance: IPostRepo = Container.get(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        postRepoInstance = Container.get(config.repos.post.name)
        /*
            authorId: string;
            content: string;
            tags: Array<string>;
        */
       var post: Post = Post.create({
           authorId: "testeAuthor1",
           content: "teste content",
           tags: ["teste","disse"]
       }).getValue()

       /*
        sinon.stub(postRepoInstance, "save").resolves(Result.ok<Post>(post));

        const srv = new PostService(postRepoInstance as IPostRepo);
        let postCreated: IPostResponseDTO = (await srv.createPost({
            authorId: "testeAuthor1",
            content: "teste content",
            tags: ["teste","disse"]
        })).getValue();
        // sinon.assert.calledOnce(res.json);
        expect(postCreated.authorId).toEqual(post.authorId);
        expect(postCreated.content).toEqual(post.content);
        expect(postCreated.tags).toEqual(post.tags);
        */
    })

    it('getPostByDomainId:', async function () {
        this.timeout(0);

        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance: IPostRepo = Container.get(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        postRepoInstance = Container.get(config.repos.post.name)

        var post: Post = Post.create({
            authorId: "testeAuthor1",
            content: "teste content",
            tags: ["teste","disse"]
        }).getValue()

        /*
        sinon.stub(postRepoInstance, "findByDomainId").returns(Result.ok<Post>(post));

        const srv = new PostService(postRepoInstance as IPostRepo);
        let postCreated: IPostResponseDTO = (await srv.createPost({
            authorId: "testeAuthor1",
            content: "teste content",
            tags: ["teste","disse"]
        })).getValue();
        // sinon.assert.calledOnce(res.json);
        expect(postCreated.authorId).toEqual(post.authorId);
        expect(postCreated.content).toEqual(post.content);
        expect(postCreated.tags).toEqual(post.tags);
        */

    })

    it('addReaction: returns json with id+content+tags+author+likes+dislikes', async function () {
        
    })

    it('getUserFeed: returns json with id+content+tags+author+likes+dislikes', async function () {
        
    })
});
