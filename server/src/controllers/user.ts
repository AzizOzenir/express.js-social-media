import { Request, Response } from "express";
import { prismaClient } from "./../index";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not_found";
import multer from "multer";
import { BASE_URL } from './../../../client/src/consts';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const updatedUser = await prismaClient.user.findMany({});
    res.json({ updatedUser });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await prismaClient.user.findUnique({
      where: { username: username },
      include: {
        posts: true,
        comments: true,
        likes: true,
        followers: true,
        following: true,
        messagesSent: true,
        messagesReceived: true,
        groups: true,
        groupMemberships: true,
        eventsOrganized: true,
        eventAttendance: true,
        sentRequests: true,
        receivedRequests: true,
        activityLogs: true,
      },
    });
    if (user) {
      res.json(user);
    } else {
      throw new NotFoundException(
        "User not found",
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

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await prismaClient.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    res.json({ user });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const {
    email,
    password,
    bio,
    location,
    profileImage,
    website,
    twitter,
    facebook,
    instagram,
  } = req.body;
  try {
    const backgroundImage = req.file !== undefined ? `http://localhost:3001/uploads/${req.file.filename}` : "";

    const updatedUser = await prismaClient.user.update({
      where: { username: username },
      data: {
        username: username,
        email: email,
        password: password,
        bio: bio,
        location: location,
        profileImage: profileImage,
        backgroundImage: backgroundImage,
        website: website,
        twitter: twitter,
        facebook: facebook,
        instagram: instagram,
      },
    });
    res.json({ updatedUser });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        username: username,
      },
    });

    // Delete related data first
    await prismaClient.comment.deleteMany({ where: { authorId: user.id } });
    await prismaClient.post.deleteMany({ where: { authorId: user.id } });
    await prismaClient.like.deleteMany({ where: { userId: user.id } });
    await prismaClient.message.deleteMany({
      where: { OR: [{ senderId: user.id }, { receiverId: user.id }] },
    });
    await prismaClient.group.deleteMany({ where: { ownerId: user.id } });
    await prismaClient.groupMember.deleteMany({ where: { userId: user.id } });
    await prismaClient.event.deleteMany({ where: { organizerId: user.id } });
    await prismaClient.eventAttendee.deleteMany({ where: { userId: user.id } });
    await prismaClient.friendRequest.deleteMany({
      where: { OR: [{ senderId: user.id }, { receiverId: user.id }] },
    });
    await prismaClient.activityLog.deleteMany({ where: { userId: user.id } });
    await prismaClient.follow.deleteMany({
      where: { OR: [{ followerId: user.id }, { followingId: user.id }] },
    });

    // Finally, delete the user
    await prismaClient.user.delete({ where: { id: user.id } });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    throw new BadRequestException(
      "Something went wrong:",
      error,
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};
