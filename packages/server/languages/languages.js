import express from "express";
import db from "../db.js";
import posts from "../posts/posts.js";
import * as Yup from "yup";
import createValidatinMiddlevare from "../middlewares/validationMiddlevare.js";
import idSchema from "./schemas/idSchema.js";
// import languageSchema from "./schemas/languageSchema.js";
import prisma from "../db-prisma.js";

const router = express.Router();
router.use("/:id/posts", posts);

router.get("/", async (request, response) => {
  console.log(request.user_id); ///////////////
  const ansLanguage = await prisma.lang.findMany({});
  return response.send(ansLanguage);
});

router.get(
  "/:id",
  createValidatinMiddlevare(idSchema),
  async (request, response) => {
    const { id } = request.params;
    try {
      const ansLanguage = await prisma.lang.findUnique({
        where: {
          id: +id,
        },
      });

      return response.send(ansLanguage);
    } catch (e) {
      return response.status(404).send(`There is not language with id:${id}`);
    }
  }
);

router.post("/", async (request, response) => {
  try {
    const { name, yearOfCreated } = request.body;
    await Yup.object()
      .shape({
        name: Yup.string().required(),
        yearOfCreated: Yup.number().required().min(1900).max(2023),
      })
      .validate({ name, yearOfCreated }, { abortEarly: false });

    const ansLanguage = await prisma.lang.findMany({
      where: {
        name: name,
      },
    });

    if (ansLanguage.length)
      return response.send(
        `The language with name: ${name} and year: ${yearOfCreated} is already exist!`
      );

    const res = await prisma.lang.create({
      data: {
        name: name,
        year: yearOfCreated,
      },
    });
    console.log(res);
    return response.send(res);
  } catch (e) {
    return response
      .status(422)
      .send(
        `The request does not contain data or not all the required data is available!`
      );
  }
});

router.delete(
  "/:id",
  createValidatinMiddlevare(idSchema),
  async (request, response) => {
    const { id } = request.params;
    try {
      const ansLanguage = await db.query(`SELECT * FROM lang WHERE id = ${id}`);
      // const ansLanguage = await prisma.lang.findUnique({
      //   where: {
      //     id: id,
      //   },
      // });

      if (!ansLanguage.rows)
        return `The language with name: ${ansLanguage.rows[0].name} is not exist!`;

      const res = await db.query("DELETE FROM lang WHERE id = $1 RETURNING *", [
        id,
      ]);

      // const res = await prisma.lang.delete({
      //   where: {
      //     id: id,
      //   },
      // });

      return response.send(res);
    } catch (e) {
      return response.send(e);
    }
  }
);

// router.patch("/:id", async (request, response) => {
// const { id } = request.params;
// const { name, yearOfCreated } = request.body;
// console.log(name);
// const helper = `SELECT * FROM lang WHERE id = ${id}`;
// const getIdQuery = await db.query(helper);
// const data = getIdQuery.rows[0];
// if (!data) return response.status(400).send("Bad request.");
// const req = `UPDATE lang SET name='${name ?? data.name}', year=${
//   yearOfCreated ?? data.year
// } WHERE id = ${id}`;
// console.log(req);
// const ansLanguage = await db.query(req);
// return response.send(ansLanguage);
// });

export default router;
