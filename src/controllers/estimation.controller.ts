import { Request, Response } from "express";
import * as estimationService from "../services/estimation.service";

export const createEstimation = async (
  req: Request,
  res: Response
): Promise<void> => {
  await estimationService.createEstimation(req, res);
};

export const getAllEstimations = async (
  req: Request,
  res: Response
): Promise<void> => {
  await estimationService.getEstimations(req, res);
};
export const updateEstimation = async (
  req: Request,
  res: Response
): Promise<void> => {
  await estimationService.updateEstimation(req, res);
};
export const deleteEstimation = async (
  req: Request,
  res: Response
): Promise<void> => {
  await estimationService.deleteEstimation(req, res);
};

export const getEstimationById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await estimationService.getEstimationById(req, res);
  };
  