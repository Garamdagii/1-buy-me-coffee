import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../../generated/prisma";

export const prisma = new PrismaClient().$extends(withAccelerate());

// │  Update available 6.7.0 -> 6.8.2                        │
// │  Run the following to update                            │
// │    npm i --save-dev prisma@latest                       │
// │    npm i @prisma/client@latest
