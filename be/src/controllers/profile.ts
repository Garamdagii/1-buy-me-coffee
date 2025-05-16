// import { Request, Response } from "express";
// import { prisma } from "../utils/prisma";

// export const createProfile = async (req: Request, res: Response) => {
//   const {
//     profileName,
//     about,
//     avatarImage,
//     socialMediaURL,
//     backgroundImage,
//     successMessage,
//     userId,
//   } = req.body;
//   try {
//     const response = await prisma.profile.create({
//       data: {
//         name: profileName,
//         about: about,
//         avatarImage: avatarImage,
//         socialMediaURL: socialMediaURL,
//         backgroundImage: backgroundImage,
//         successMessage: successMessage,
//         userId: userId,
//       },
//     });
//     return res.send({
//       success: true,
//       message: response,
//     });
//   } catch (error) {
//     console.error(error, "err");
//     return res.send({
//       success: false,
//       message: error,
//     });
//   }
// };

// export const findProfile = async (_: never, res: Response) => {
//   try {
//     const response = await prisma.profile.findMany();
//     return res.send({
//       success: true,
//       message: response,
//     });
//   } catch (error) {
//     console.error(error, "err");
//     return res.send({
//       success: false,
//       message: error,
//     });
//   }
// };

// export const updateProfile = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const {
//     name,
//     about,
//     avatarImage,
//     socialMediaURL,
//     backgroundImage,
//     successMessage,
//     userId,
//   } = req.body;
//   try {
//     const response = await prisma.profile.update({
//       where: { id: Number(id) },
//       data: {
//         name,
//         about,
//         avatarImage,
//         socialMediaURL,
//         backgroundImage,
//         successMessage,
//         userId,
//       },
//     });
//     return res.send({
//       success: true,
//       message: response,
//     });
//   } catch (error) {
//     console.error(error, "err");
//     return res.send({
//       success: false,
//       message: error,
//     });
//   }
// };

// export const deleteProfile = async (req: Request, res: Response) => {
//   const { id } = req.body;
//   try {
//     const response = await prisma.profile.delete({
//       where: { id: Number(id) },
//     });
//     return res.send({
//       success: true,
//       message: response,
//     });
//   } catch (error) {
//     console.error(error, "err");
//     return res.send({
//       success: false,
//       message: error,
//     });
//   }
// };
