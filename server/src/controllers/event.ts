import { Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from './../index';
import { NotFoundException } from "../exceptions/not_found";




export const getEvents = async (req: Request, res: Response) => {
    try {
      const events = await prismaClient.event.findMany({
        include: {
          organizer: true,
          attendees: true,
        },
      });
      res.json({ events });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const getEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const event = await prismaClient.event.findUnique({
        where: { id: parseInt(id) },
        include: {
          organizer: true,
          attendees: true,
        },
      });
      if (event) {
        res.json({ event });
      } else {
        throw new NotFoundException(
          "Event not found",
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
  
  export const createEvent = async (req: Request, res: Response) => {
    const { name, description, date, organizerId } = req.body;
    try {
      const event = await prismaClient.event.create({
        data: {
          name,
          description,
          date,
          organizerId,
        },
      });
      res.json({ event });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, date } = req.body;
    try {
      const updatedEvent = await prismaClient.event.update({
        where: { id: parseInt(id) },
        data: { name, description, date },
      });
      res.json({ updatedEvent });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  
  export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prismaClient.event.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      throw new BadRequestException(
        "Something went wrong:",
        error,
        ErrorCode.UNPROCESSABLE_ENTITY
      );
    }
  };
  