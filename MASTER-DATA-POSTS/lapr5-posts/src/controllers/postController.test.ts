import 'reflect-metadata'
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import IPostService from "../services/IServices/IPostService";
import PostController from "./postController";
import IPostCreateRequestDTO from '../dto/posts/IPostCreateRequestDTO';
import IPostResponseDTO from '../dto/posts/IPostResponseDTO';
import IPostUserFeedDto from '../dto/posts/IPostUserFeedDto';
import IPostUserFeedDtoRequest from '../dto/posts/IPostUserFeedDtoRequest';


describe('post controller', function () {
    beforeEach(function () {
    });

    /*
        authorId: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array()
    */
    it('createPost: returns json with id+content+tags+author+likes+dislikes', async function () {
        this.timeout(0);
        let body = { "authorId": 'testeA1', "content": "AAAA", tags: ["Ola", "Teste98"] };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let postServiceClass = require(config.services.post.path).default;
        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance = Container.set(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        let postServiceInstance = Container.get(postServiceClass);
        Container.set(config.services.post.name, postServiceInstance);
        postServiceInstance = Container.get(config.services.post.name);
        /*
        id: string;
        authorId: string;
        content: string;
        likes: Array<ILikeDTO>;
        dislikes: Array<IDislikeDTO>;
        tags: Array<string>;
        comments: Array<ICommentDTO>;
        */
        sinon.stub(postServiceInstance, "createPost").returns(Result.ok<IPostResponseDTO>(
            { 
                "id": "33324456", 
                "content": req.body.content,
                "likes": [],
                "dislikes": [],
                "tags": req.body.tags,
                "comments": [],
                "authorId": req.body.authorId
            }
            ));
        const ctrl = new PostController(postServiceInstance as IPostService);
        await ctrl.createPost(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            { 
                "id": "33324456", 
                "content": req.body.content,
                "likes": [],
                "dislikes": [],
                "tags": req.body.tags,
                "comments": [],
                "authorId": req.body.authorId
            }
            ));
    })

    it('getPostByDomainId: returns json with id+content+tags+author+likes+dislikes', async function () {
        this.timeout(0);
        // let body = { "authorId": 'testeA1', "content": "AAAA", tags: ["Ola", "Teste98"] };
        let req: Partial<Request> = {};
        req.params = {domainId: "teste1"};

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let postServiceClass = require(config.services.post.path).default;
        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance = Container.set(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        let postServiceInstance = Container.get(postServiceClass);
        Container.set(config.services.post.name, postServiceInstance);
        postServiceInstance = Container.get(config.services.post.name);
        /*
        id: string;
        authorId: string;
        content: string;
        likes: Array<ILikeDTO>;
        dislikes: Array<IDislikeDTO>;
        tags: Array<string>;
        comments: Array<ICommentDTO>;
        */
        sinon.stub(postServiceInstance, "findByDomainId").returns(Result.ok<IPostResponseDTO>(
            { 
                "id": "teste1", 
                "content": "AAA",
                "likes": [],
                "dislikes": [],
                "tags": [],
                "comments": [],
                "authorId": "testeAuthor"
            }
            ));
        const ctrl = new PostController(postServiceInstance as IPostService);
        await ctrl.getPostById(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            { 
                "id": "teste1", 
                "content": "AAA",
                "likes": [],
                "dislikes": [],
                "tags": [],
                "comments": [],
                "authorId": "testeAuthor"
            }
            ));
    })

    it('addReaction: returns json with id+content+tags+author+likes+dislikes', async function () {
        this.timeout(0);
        /*
        parentId: string; //id do post ou comentário
        authorId: string;
        reaction: string;
        */
        let body = { "parentId": 'testeA1', "authorId": "AAAA", "reaction": "LIKE" };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let postServiceClass = require(config.services.post.path).default;
        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance = Container.set(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        let postServiceInstance = Container.get(postServiceClass);
        Container.set(config.services.post.name, postServiceInstance);
        postServiceInstance = Container.get(config.services.post.name);
        /*
        id: string;
        authorId: string;
        content: string;
        likes: Array<ILikeDTO>;
        dislikes: Array<IDislikeDTO>;
        tags: Array<string>;
        comments: Array<ICommentDTO>;
        */
        sinon.stub(postServiceInstance, "addReaction").returns(Result.ok<IPostResponseDTO>(
            { 
                "id": "testeA1", 
                "content": "A",
                "likes": [{"userId":"AAAA","reaction":"LIKE"}],
                "dislikes": [],
                "tags": [],
                "comments": [],
                "authorId": "testeA1Author"
            }
            ));
        const ctrl = new PostController(postServiceInstance as IPostService);
        await ctrl.addReaction(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            { 
                "id": "testeA1", 
                "content": "A",
                "likes": [{"userId":"AAAA","reaction":"LIKE"}],
                "dislikes": [],
                "tags": [],
                "comments": [],
                "authorId": "testeA1Author"
            }
            ));
    })

    it('getUserFeed: returns json with id+content+tags+author+likes+dislikes', async function () {
        this.timeout(0);
        let body = { "authorName": 'Rafael'};
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let postServiceClass = require(config.services.post.path).default;
        let postRepoClass = require(config.repos.post.path).default;
        let postRepoInstance = Container.set(postRepoClass);
        Container.set(config.repos.post.name, postRepoInstance);
        let postServiceInstance = Container.get(postServiceClass);
        Container.set(config.services.post.name, postServiceInstance);
        postServiceInstance = Container.get(config.services.post.name);
        /*
        id: string;
        authorId: string;
        content: string;
        likes: Array<ILikeDTO>;
        dislikes: Array<IDislikeDTO>;
        tags: Array<string>;
        comments: Array<ICommentDTO>;
        */
        sinon.stub(postServiceInstance, "getUserFeed").returns(Result.ok<IPostResponseDTO[]>(
            [{ 
                "id": "33324456", 
                "content": "AAAA",
                "likes": [],
                "dislikes": [],
                "tags": [],
                "comments": [],
                "authorId": "test1"
            }]
            ));
        const ctrl = new PostController(postServiceInstance as IPostService);
        await ctrl.getUserFeed(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match(
            [{ 
                "id": "33324456", 
                "content": "AAAA",
                "likes": [],
                "dislikes": [],
                "tags": [],
                "comments": [],
                "authorId": "test1"
            }]
            ));
    })
});
