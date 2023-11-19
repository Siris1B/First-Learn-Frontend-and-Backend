-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "header" VARCHAR(500),
    "description" VARCHAR(5000),
    "rating" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "language_id" INTEGER,
    "author_id" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(255),
    "last_login_at" DATE,
    "password" VARCHAR(255) NOT NULL,
    "user_email" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lang" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "year" VARCHAR(255),

    CONSTRAINT "Lang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pk" ON "User"("user_name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Posts_User_id_fk" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Posts_lang_id_fk" FOREIGN KEY ("language_id") REFERENCES "Lang"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
