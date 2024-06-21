import { Request, Response } from "express";
import { prismaClient } from "./../index";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not_found";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prismaClient.message.findMany({
      include: {
        sender: true,
        receiver: true,
      },
    });
    res.json({ messages });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const message = await prismaClient.message.findUnique({
      where: { id: parseInt(id) },
      include: {
        sender: true,
        receiver: true,
      },
    });
    if (message) {
      res.json({ message });
    } else {
      throw new NotFoundException(
        "Message not found",
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

export const createMessage = async (req: Request, res: Response) => {
  const { content, senderId, receiverId } = req.body;
  try {
    const message = await prismaClient.message.create({
      data: {
        content,
        senderId,
        receiverId,
      },
    });
    res.json({ message });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};



export const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, senderId, receiverId } = req.body;

  try {
    const message = await prismaClient.message.update({
      where: { id: Number(id) },
      data: {
        content,
        senderId,
        receiverId,
      },
    });
    res.json({ message });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaClient.message.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
