import express from "express";
import db from "../db.js";
import idSchema from "./schemas/idSchema.js";
import checkIdMiddleware from "./middlewares/checkIdMiddleware.js";
import createValidatinMiddlevare from "../middlewares/validationMiddlevare.js";
import prisma from "../db-prisma.js";

const router = express.Router({
  mergeParams: true,
});

router.get("/", checkIdMiddleware(idSchema), async (req, res) => {
  try {
    const page = req.query.page ? +req.query.page : 1;
    const postsPerPage = req.query.postsPerPage ? +req.query.pageSize : 3;
    const id = req.params.id;

    console.log(page, postsPerPage);

    const ansLanguage = await prisma.lang.findMany({
      select: {
        Posts: {
          select: {
            id: true,
            description: true,
            rating: true,
            created_at: true,
            updated_at: true,
            language_id: true,
            author_id: true,
            User: {
              select: {
                user_name: true,
              },
            },
          },
        },
      },
      where: {
        id: +id,
      },
      orderBy: {
        id: "desc",
      },
    });
    const data = ansLanguage[0].Posts.slice(
      postsPerPage * page - postsPerPage,
      postsPerPage * page
    );

    return res.send({ data, total: ansLanguage[0].Posts.length });
  } catch (e) {
    console.log(e);
    return res.status(400).send("Bad request.");
  }
});

router.post("/", createValidatinMiddlevare(idSchema), async (req, res) => {
  try {
    console.log(req.body);
    await prisma.post.create({
      data: {
        description: req.body.post,
        author_id: req.user_id,
        language_id: +req.body.id,
      },
    });

    return res.status(200).send("Language added success.");
  } catch (e) {
    console.log(e);
  }
});
export default router;
