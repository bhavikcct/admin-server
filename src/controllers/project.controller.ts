import { Request, Response } from "express";
import * as projectService from "../services/project.service";

export const createproject = async (
  req: Request,
  res: Response
): Promise<void> => {
  await projectService.createProject(req, res);
};

export const getAllProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  await projectService.getProjects(req, res);
};
export const updateProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  await projectService.updateProject(req, res);
};
export const deleteproject = async (
  req: Request,
  res: Response
): Promise<void> => {
  await projectService.deleteProject(req, res);
};

export const getprojectbyID = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await projectService.getProjectById(req, res);
  };
  