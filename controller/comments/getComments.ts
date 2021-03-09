import { Request, Response, NextFunction } from "express";
import { getCommentModel } from "../../models/comments/getCommentModel";

const getComments = (req: Request, res: Response, next: NextFunction) => {
  try {
    getCommentModel(req.body.posts);
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};
module.exports = getComments;
