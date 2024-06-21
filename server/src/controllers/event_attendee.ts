import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from './../index';
import { NotFoundException } from "../exceptions/not_found";



export const getEventAttendees = async (req: Request, res: Response) => {
    try {
      const eventAttendees = await prismaClient.eventAttendee.findMany({
        include: {
          event: true,
          user: true,
        },
      });
      res.json({ eventAttendees });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const getEventAttendee = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const eventAttendee = await prismaClient.eventAttendee.findUnique({
        where: { id: parseInt(id) },
        include: {
          event: true,
          user: true,
        },
      });
      if (eventAttendee) {
        res.json({ eventAttendee });
      } else {
        throw new NotFoundException(
          "Event attendee not found",
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
  
  export const createEventAttendee = async (req: Request, res: Response) => {
    const { eventId, userId } = req.body;
    try {
      const eventAttendee = await prismaClient.eventAttendee.create({
        data: {
          eventId,
          userId,
        },
      });
      res.json({ eventAttendee });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  

  export const updateEventAttendee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { eventId, userId } = req.body;
  
    try {
      const eventAttendee = await prismaClient.eventAttendee.update({
        where: { id: Number(id) },
        data: {
          eventId,
          userId,
        },
      });
      res.json({ eventAttendee });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };


  export const deleteEventAttendee = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prismaClient.eventAttendee.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Event attendee deleted successfully" });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  