import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "./../index";
import { NotFoundException } from "../exceptions/not_found";

export const getLikes = async (req: Request, res: Response) => {
  try {
    const likes = await prismaClient.like.findMany({
      include: {
        post: true,
        user: true,
      },
    });
    res.json({ likes });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const like = await prismaClient.like.findUnique({
      where: { id: parseInt(id) },
      include: {
        post: true,
        user: true,
      },
    });
    if (like) {
      res.json({ like });
    } else {
      throw new NotFoundException(
        "Like not found",
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

export const createLike = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;
  try {
    const like = await prismaClient.like.create({
      data: {
        postId,
        userId,
      },
    });
    res.json({ like });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};


export const updateLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { postId, userId } = req.body;
  
  try {
    const like = await prismaClient.like.update({
      where: { id: Number(id) },
      data: {
        postId,
        userId,
      },
    });
    res.json({ like });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};



export const deleteLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaClient.like.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Like deleted successfully" });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
