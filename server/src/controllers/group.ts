import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from './../index';
import { NotFoundException } from "../exceptions/not_found";


export const getGroups = async (req: Request, res: Response) => {
    try {
      const groups = await prismaClient.group.findMany({
        include: {
          owner: true,
          members: true,
        },
      });
      res.json({ groups });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const getGroup = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const group = await prismaClient.group.findUnique({
        where: { id: parseInt(id) },
        include: {
          owner: true,
          members: true,
        },
      });
      if (group) {
        res.json({ group });
      } else {
        throw new NotFoundException(
          "Group not found",
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
  
  export const createGroup = async (req: Request, res: Response) => {
    const { name, description, ownerId } = req.body;
    try {
      const group = await prismaClient.group.create({
        data: {
          name,
          description,
          ownerId,
        },
      });
      res.json({ group });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const updateGroup = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const updatedGroup = await prismaClient.group.update({
        where: { id: parseInt(id) },
        data: { name, description },
      });
      res.json({ updatedGroup });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const deleteGroup = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Delete related group member data first
      await prismaClient.groupMember.deleteMany({
        where: { groupId: parseInt(id) },
      });
      // Finally, delete the group
      await prismaClient.group.delete({ where: { id: parseInt(id) } });
      res.json({ message: "Group deleted successfully" });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  