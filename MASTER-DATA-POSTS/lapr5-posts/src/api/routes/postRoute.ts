import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { UserId } from '../../domain/users/userId';

import { Container } from 'typedi';
import IPostController from '../../controllers/IControllers/IPostController'


import config from "../../../config";


const route = Router();

export default (app: Router) => {
    app.use('/posts', route);

    const postController = Container.get(config.controllers.post.name) as IPostController;

    route.post('',
    celebrate({
        body: Joi.object({
            authorId: Joi.string().required(),
            content: Joi.string().required(),
            tags: Joi.array()
      })
    }),
    (req, res, next) => postController.createPost(req, res, next) );

    route.put('/reaction',
    celebrate({
        body: Joi.object({
            parentId: Joi.string().required(),
            authorId: Joi.string().required(),
            reaction: Joi.string().required()

      })
    }),
    (req, res, next) => postController.addReaction(req, res, next) );

    route.get('',
    celebrate({
        body: Joi.object({
            authorId: Joi.string().required(),
      })
    }),
    (req, res, next) => postController.getAll(req, res, next) );

    route.post('/userFeed',
    celebrate({
        body: Joi.object({
            authorName: Joi.string().required(),
      })
    }),
    ( req, res, next) => postController.getUserFeed(req, res, next) );

    route.get('/:domainId',
    ( req, res, next) => postController.getPostById(req, res, next) );

    route.delete('/:userId',
    ( req, res, next) => postController.deletePostsCommentsReactions(req, res, next) );
}


