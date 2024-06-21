import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from './../index';
import { NotFoundException } from "../exceptions/not_found";




export const getComments = async (req: Request, res: Response) => {
    try {
      const comments = await prismaClient.comment.findMany({
        include: {
          post: true,
          author: true,
        },
      });
      res.json({ comments });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const getComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const comment = await prismaClient.comment.findUnique({
        where: { id: parseInt(id) },
        include: {
          post: true,
          author: true,
        },
      });
      if (comment) {
        res.json({ comment });
      } else {
        throw new NotFoundException(
          "Comment not found",
          ErrorCode.UNPROCESSABLE_ENTITY
        );
      }
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const createComment = async (req: Request, res: Response) => {
    const { content, postId, authorId } = req.body;
    try {
      const comment = await prismaClient.comment.create({
        data: {
          content,
          postId,
          authorId,
        },
      });
      res.json({ comment });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const updateComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const updatedComment = await prismaClient.comment.update({
        where: { id: parseInt(id) },
        data: { content },
      });
      res.json({ updatedComment });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prismaClient.comment.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  