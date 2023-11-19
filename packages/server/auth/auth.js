import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";

import createValidatinMiddlevare from "../middlewares/validationMiddlevare.js";
import signinSchema from "./schemas/signinSchema.js";
import signupSchema from "./schemas/baseSchema.js";
import jwtSign from "./services/jwt.js";
import prisma from "../db-prisma.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/signup",
  createValidatinMiddlevare(signupSchema),
  async (request, response) => {
    try {
      const { userName, userEmail, password } = request.body;

      const userQuery = await db.query(
        'SELECT "user_name" FROM "User" WHERE "user_name"=$1',
        [userName]
      );
      const ansLanguage = await prisma.User.findMany({
        select: {
          user_name: true,
        },
        where: {
          user_name: userName,
        },
      });
      console.log(ansLanguage);

      if (ansLanguage.length) {
        return response.status(409).send("User already exist!");
      }

      const hash = await bcrypt.hash(password, 10);
      const timeOfReg = new Date().toISOString();

      await prisma.User.create({
        data: {
          user_name: userName,
          last_login_at: timeOfReg,
          user_email: userEmail,
          password: hash,
        },
      });

      let token;
      try {
        token = jwt.sign(
          {
            userName,
            userEmail,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );
        return response.status(201).send({ token });
      } catch (e) {
        console.log(e);
        return response.status(400).send(e);
      }
    } catch (e) {
      console.log(e);
      return response.status(400);
    }
  }
);

router.post(
  "/signin",
  createValidatinMiddlevare(signinSchema),
  async (request, response) => {
    try {
      const { userName, password } = request.body;
      const ansUser = await prisma.User.findUnique({
        where: {
          user_name: userName,
        },
      });

      if (!ansUser) {
        return response.status(401).send("Wrong user name or password!");
      }

      const isPasswordMatch = await bcrypt.compare(password, ansUser.password);

      if (!isPasswordMatch) {
        return response.status(401).send("Wrong user name or password!");
      }

      if (ansUser && isPasswordMatch) {
        const token = jwtSign(userName, ansUser.user_email);
        return response.status(200).send({ token });
      }
    } catch (e) {
      console.log(e);
      return response.status(400);
    }
  }
);

export default router;
