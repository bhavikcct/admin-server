import { Request, Response } from "express";
import prisma from "../config/db";

export const createProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: { name, description },
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  const { search } = req.query;
  try {
    const projects = await prisma.project.findMany({
      where: {
        name: {
          contains: search ? String(search) : "",
          mode: "insensitive",
        },
      },
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: { name, description },
    });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProject = await prisma.project.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedProject);
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await prisma.project.findUnique({
        where: { id: Number(id) },
      });
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project", error });
    }
  };
  