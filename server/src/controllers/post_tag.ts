import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "./../index";

export const getPostTags = async (req: Request, res: Response) => {
  try {
    const postTags = await prismaClient.postTag.findMany({
      include: {
        post: true,
        tag: true,
      },
    });
    res.json({ postTags });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getPostTag = async (req: Request, res: Response) => {
  const { postId, tagId } = req.params;
  try {
    const postTag = await prismaClient.postTag.findUnique({
      where: {
        postId_tagId: { postId: parseInt(postId), tagId: parseInt(tagId) },
      },
      include: {
        post: true,
        tag: true,
      },
    });
    if (postTag) {
      res.json({ postTag });
    } else {
      throw new NotFoundException(
        "PostTag not found",
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

export const createPostTag = async (req: Request, res: Response) => {
  const { postId, tagId } = req.body;
  try {
    const postTag = await prismaClient.postTag.create({
      data: {
        postId,
        tagId,
      },
    });
    res.json({ postTag });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const updatePostTag = async (req: Request, res: Response) => {
  const { postId, tagId } = req.body;
  try {
    const postTag = await prismaClient.postTag.update({
      where: {
        postId_tagId: { postId: parseInt(postId), tagId: parseInt(tagId) },
      },
      data: {
        postId,
        tagId,
      },
    });
    res.json({ postTag });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deletePostTag = async (req: Request, res: Response) => {
  const { postId, tagId } = req.body;
  try {
    await prismaClient.postTag.delete({
      where: {
        postId_tagId: { postId: parseInt(postId), tagId: parseInt(tagId) },
      },
    });
    res.json({ message: "PostTag deleted successfully" });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
