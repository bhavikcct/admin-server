import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  await authService.register(req, res);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  await authService.login(req, res);
};
export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  await authService.forgotPassword(req, res);
};
export const resetPassword = async(req: Request, res: Response) : Promise<void> => {

    await authService.resetPassword(req, res);
}
