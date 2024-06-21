import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "./../index";
import { NotFoundException } from "../exceptions/not_found";

export const getFollows = async (req: Request, res: Response) => {
  try {
    const follows = await prismaClient.follow.findMany({
      include: {
        follower: true,
        following: true,
      },
    });
    res.json({ follows });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getFollow = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const follow = await prismaClient.follow.findUnique({
      where: { id: parseInt(id) },
      include: {
        follower: true,
        following: true,
      },
    });
    if (follow) {
      res.json({ follow });
    } else {
      throw new NotFoundException(
        "Follow not found",
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

export const createFollow = async (req: Request, res: Response) => {
  const { followerId, followingId } = req.body;
  try {
    const follow = await prismaClient.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
    res.json({ follow });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const updateFollow = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { followerId, followingId } = req.body;

  try {
    const follow = await prismaClient.follow.update({
      where: { id: Number(id) },
      data: {
        followerId,
        followingId,
      },
    });
    res.json({ follow });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deleteFollow = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaClient.follow.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Follow deleted successfully" });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
