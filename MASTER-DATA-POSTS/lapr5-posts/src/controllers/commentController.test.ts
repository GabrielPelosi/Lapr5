import 'reflect-metadata';
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';

import ICommentService from '../services/IServices/ICommentService';
import ICommentDTO from '../dto/comments/ICommentDTO';
import CommentController from './commentController';

describe('comment controller', function() {
  beforeEach(function() {});

  it('createComment: returns json with comment values', async function() {
    this.timeout(0);
    let body = {
      userId: 'test1',
      postId: 'post1',
      name: 'name1',
      avatar: 'avatar1',
      likes: [],
      dislikes: [],
      text: 'comment1',
      tags: ['Music', 'Games'],
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let postServiceClass = require(config.services.post.path).default;
    let postRepoClass = require(config.repos.post.path).default;
    let postRepoInstance = Container.set(postRepoClass);
    Container.set(config.repos.post.name, postRepoInstance);
    let postServiceInstance = Container.get(postServiceClass);
    Container.set(config.services.post.name, postServiceInstance);
    postServiceInstance = Container.get(config.services.post.name);

    let commentServiceClass = require(config.services.comment.path).default;
    let commentRepoClass = require(config.repos.comment.path).default;
    let commentRepoInstance = Container.set(commentRepoClass);
    Container.set(config.repos.comment.name, commentRepoInstance);
    let commentServiceInstance = Container.get(commentServiceClass);
    Container.set(config.services.comment.name, commentServiceInstance);

    sinon.stub(commentServiceInstance, 'createComment').returns(
      Result.ok<ICommentDTO>({
        id: '123',
        userId: req.body.userId,
        postId: req.body.postId,
        name: req.body.nome,
        avatar: req.body.avatar,
        likes: [],
        dislikes: [],
        text: req.body.text,
        tags: req.body.tags,
      }),
    );

    const ctrl = new CommentController(commentServiceInstance as ICommentService);

    await ctrl.createComment(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        id: '123',
        userId: req.body.userId,
        postId: req.body.postId,
        name: req.body.nome,
        avatar: req.body.avatar,
        likes: [],
        dislikes: [],
        text: req.body.text,
        tags: req.body.tags,
      }),
    );
  });

  it('addReaction: returns json with comment values', async function() {
    this.timeout(0);

    let body = {
      userId: 'test1',
      postId: 'post1',
      name: 'name1',
      avatar: 'avatar1',
      likes: [],
      dislikes: [],
      text: 'comment1',
      tags: ['Music', 'Games'],
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let commentServiceClass = require(config.services.comment.path).default;
    let commentRepoClass = require(config.repos.comment.path).default;
    let commentRepoInstance = Container.set(commentRepoClass);
    Container.set(config.repos.comment.name, commentRepoInstance);
    let commentServiceInstance = Container.get(commentServiceClass);
    Container.set(config.services.comment.name, commentServiceInstance);
    commentServiceInstance = Container.get(config.services.comment.name);

    sinon.stub(commentServiceInstance, 'addReaction').returns(
      Result.ok<ICommentDTO>({
        id: '123',
        userId: 'testUserId',
        postId: 'testPostId',
        name: 'testName',
        avatar: 'testAvatar',
        likes: [{ userId: 'user123', reaction: 'LIKE' }],
        dislikes: [],
        text: 'testCommentText',
        tags: [],
      }),
    );

    const ctrl = new CommentController(commentServiceInstance as ICommentService);
    await ctrl.addReaction(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        id: '123',
        userId: 'testUserId',
        postId: 'testPostId',
        name: 'testName',
        avatar: 'testAvatar',
        likes: [{ userId: 'user123', reaction: 'LIKE' }],
        dislikes: [],
        text: 'testCommentText',
        tags: [],
      }),
    );
  });
});
