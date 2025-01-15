import express from "express";
import {
  authorsGet,
  authorGet,
  authorPost,
  authorPut,
  authorDelete,
} from "../controllers/authorController";

const authorRoute = express.Router();

authorRoute.route('/').get(authorsGet).post(authorPost);

authorRoute.route('/:id').get(authorGet).put(authorPut).delete(authorDelete);

export default authorRoute;
