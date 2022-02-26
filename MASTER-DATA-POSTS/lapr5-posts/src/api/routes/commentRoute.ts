import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ICommentController from '../../controllers/IControllers/ICommentController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/comments', route);

  const ctrl = Container.get(config.controllers.comment.name) as ICommentController;

  route.post('',
    celebrate({
      body: Joi.object({
        userId: Joi.string().required(),
        postId: Joi.string().required(),
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        text: Joi.string().required(), //obrigatório
        tags: Joi.array() //opcional
      })
    }),
    (req, res, next) => ctrl.createComment(req, res, next)
  );

  route.put('/reaction',
    celebrate({
      body: Joi.object({
        parentId: Joi.string().required(),
        authorId: Joi.string().required(),
        reaction: Joi.string().required()

      })
    }),
    (req, res, next) => ctrl.addReaction(req, res, next)
  );

  //getAllCommentsByPostId

}