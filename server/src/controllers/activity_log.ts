import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from './../index';
import { NotFoundException } from "../exceptions/not_found";




export const getActivityLogs = async (req: Request, res: Response) => {
    try {
      const activityLogs = await prismaClient.activityLog.findMany({
        include: {
          user: true,
        },
      });
      res.json({ activityLogs });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const getActivityLog = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const activityLog = await prismaClient.activityLog.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: true,
        },
      });
      if (activityLog) {
        res.json({ activityLog });
      } else {
        throw new NotFoundException(
          "Activity log not found",
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
  
  export const createActivityLog = async (req: Request, res: Response) => {
    const { userId, requestCount } = req.body;
    try {
      const activityLog = await prismaClient.activityLog.create({
        data: {
          userId,
          requestCount,
        },
      });
      res.json({ activityLog });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const updateActivityLog = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { requestCount } = req.body;
    try {
      const updatedActivityLog = await prismaClient.activityLog.update({
        where: { id: parseInt(id) },
        data: { requestCount },
      });
      res.json({ updatedActivityLog });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const deleteActivityLog = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prismaClient.activityLog.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Activity log deleted successfully" });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  