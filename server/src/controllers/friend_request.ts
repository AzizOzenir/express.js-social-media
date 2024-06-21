import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from './../index';
import { NotFoundException } from "../exceptions/not_found";




export const getFriendRequests = async (req: Request, res: Response) => {
    try {
      const friendRequests = await prismaClient.friendRequest.findMany({
        include: {
          sender: true,
          receiver: true,
        },
      });
      res.json({ friendRequests });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const getFriendRequest = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const friendRequest = await prismaClient.friendRequest.findUnique({
        where: { id: parseInt(id) },
        include: {
          sender: true,
          receiver: true,
        },
      });
      if (friendRequest) {
        res.json({ friendRequest });
      } else {
        throw new NotFoundException(
          "Friend request not found",
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
  
  export const createFriendRequest = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;
    try {
      const friendRequest = await prismaClient.friendRequest.create({
        data: {
          senderId,
          receiverId,
        },
      });
      res.json({ friendRequest });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const updateFriendRequest = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const updatedFriendRequest = await prismaClient.friendRequest.update({
        where: { id: parseInt(id) },
        data: { status },
      });
      res.json({ updatedFriendRequest });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const deleteFriendRequest = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prismaClient.friendRequest.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Friend request deleted successfully" });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  