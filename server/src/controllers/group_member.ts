import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "./../index";
import { NotFoundException } from "../exceptions/not_found";

export const getGroupMembers = async (req: Request, res: Response) => {
  try {
    const groupMembers = await prismaClient.groupMember.findMany({
      include: {
        group: true,
        user: true,
      },
    });
    res.json({ groupMembers });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getGroupMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const groupMember = await prismaClient.groupMember.findUnique({
      where: { id: parseInt(id) },
      include: {
        group: true,
        user: true,
      },
    });
    if (groupMember) {
      res.json({ groupMember });
    } else {
      throw new NotFoundException(
        "Group member not found",
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

export const createGroupMember = async (req: Request, res: Response) => {
  const { groupId, userId } = req.body;
  try {
    const groupMember = await prismaClient.groupMember.create({
      data: {
        groupId,
        userId,
      },
    });
    res.json({ groupMember });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const updateGroupMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { groupId, userId } = req.body;

  try {
    const groupMember = await prismaClient.groupMember.update({
      where: { id: Number(id) },
      data: {
        groupId,
        userId,
      },
    });
    res.json({ groupMember });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deleteGroupMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaClient.groupMember.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Group member deleted successfully" });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
