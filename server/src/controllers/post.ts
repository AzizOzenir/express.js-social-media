import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "./../index";
import { NotFoundException } from "../exceptions/not_found";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prismaClient.post.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
        tags: true,
      },
    });
    res.json({posts});
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prismaClient.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
        comments: true,
        likes: true,
        tags: true,
      },
    });
    if (post) {
      res.json({post});
    } else {
      throw new NotFoundException(
        "Post not found",
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

export const createPost = async (req: Request, res: Response) => {
  const { content, imageUrl, authorId, tags } = req.body;
  try {
    const post = await prismaClient.post.create({
      data: {
        content,
        imageUrl,
        authorId,
        tags: {
          create: tags,
        },
      },
    });
    res.json({post});
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, imageUrl, tags } = req.body;
  try {
    const updatedPost = await prismaClient.post.update({
      where: { id: parseInt(id) },
      data: {
        content,
        imageUrl,
        tags: {
          set: tags,
        },
      },
    });
    res.json({updatedPost});
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Delete related data first
    await prismaClient.comment.deleteMany({
      where: { postId: parseInt(id) },
    });
    await prismaClient.like.deleteMany({
      where: { postId: parseInt(id) },
    });
    await prismaClient.postTag.deleteMany({
      where: { postId: parseInt(id) },
    });
    // Finally, delete the post
    await prismaClient.post.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
