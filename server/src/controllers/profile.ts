import { Request, Response } from "express";
import { prismaClient } from './../index';
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";

export const getProfiles = async (req: Request, res: Response) => {
    try {
      const profiles = await prismaClient.profile.findMany({});
      res.json(profiles);
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const getProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const profile = await prismaClient.profile.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: true,
        },
      });
      if (profile) {
        res.json(profile);
      } else {
        throw new NotFoundException(
          "Profile not found",
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
  
  export const createProfile = async (req: Request, res: Response) => {
    const { bio, profileImage, backgroundImage, location, website, twitter, facebook, instagram, userId } = req.body;
    try {
      const profile = await prismaClient.profile.create({
        data: {
          bio,
          profileImage,
          backgroundImage,
          location,
          website,
          twitter,
          facebook,
          instagram,
          userId,
        },
      });
      res.json(profile);
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const updateProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { bio, profileImage, backgroundImage, location, website, twitter, facebook, instagram } = req.body;
    try {
      const updatedProfile = await prismaClient.profile.update({
        where: { id: parseInt(id) },
        data: { bio, profileImage, backgroundImage, location, website, twitter, facebook, instagram },
      });
      res.json(updatedProfile);
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };


  export const deleteProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prismaClient.profile.delete({ where: { id: parseInt(id) } });
      res.json({ message: "Profile deleted successfully" });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };