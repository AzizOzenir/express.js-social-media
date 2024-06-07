import { NextFunction, Request, Response } from "express";
import { signupSchema } from "../schema/users";
import { BadRequestException } from "../exceptions/bad_requests";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "./../index";
import { compareSync, hashSync } from "bcrypt";
import { NotFoundException } from "../exceptions/not_found";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signupSchema.parse(req.body);

  const { email, password, username } = await req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    next(
      new BadRequestException(
        "User already exists!",
        null,
        ErrorCode.USER_ALREADY_EXISTS
      )
    );
  }
  user = await prismaClient.user.create({
    data: {
      username: username,
      email: email,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = await req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  console.log("userr", user);

  if (!user) {
    throw new NotFoundException(
      "User does not exists!",
      ErrorCode.USER_NOT_FOUND
    );
  }

  if (!compareSync(password, user!.password)) {
    throw new BadRequestException(
      "incorrect password",
      null,
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign(
    {
      userId: user!.id,
    },
    JWT_SECRET
  );

  res.json({ user: user, token: token });
};
/* 
export const me = async (req: Request, res: Response) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
 */