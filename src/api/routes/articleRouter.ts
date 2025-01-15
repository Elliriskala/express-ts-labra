import express from 'express';
import {
  articlesGet,
  articleGet,
  articlePost,
  articlePut,
  articleDelete,
} from '../controllers/articleController';

const articleRoute = express.Router();

articleRoute.route('/').get(articlesGet).post(articlePost);

articleRoute.route('/:id').get(articleGet).put(articlePut).delete(articleDelete);

export default articleRoute;
