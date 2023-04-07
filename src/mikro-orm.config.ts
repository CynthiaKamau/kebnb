import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]$/,
  },
  entities: [Post],
  dbName: process.env.POSTGRES_DB,
  type: "postgresql",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
