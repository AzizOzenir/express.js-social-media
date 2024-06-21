import { Request, Response } from "express";
import { prismaClient } from './../index';
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not_found";

export const getTags = async (req: Request, res: Response) => {
    try {
      const tags = await prismaClient.tag.findMany({
        include: {
          posts: true,
        },
      });
      res.json({tags});
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const getTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const tag = await prismaClient.tag.findUnique({
        where: { id: parseInt(id) },
        include: {
          posts: true,
        },
      });
      if (tag) {
        res.json({tag});
      } else {
        throw new NotFoundException(
          "Tag not found",
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
  
  export const createTag = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const tag = await prismaClient.tag.create({
        data: {
          name,
        },
      });
      res.json({tag});
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const updateTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updatedTag = await prismaClient.tag.update({
        where: { id: parseInt(id) },
        data: { name },
      });
      res.json({updatedTag});
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };



  export const deleteTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Delete related post-tag associations first
      await prismaClient.postTag.deleteMany({
        where: { tagId: parseInt(id) },
      });
      // Finally, delete the tag
      await prismaClient.tag.delete({ where: { id: parseInt(id) } });
      res.json({ message: "Tag deleted successfully" });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };