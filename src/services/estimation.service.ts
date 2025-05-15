import { Request, Response } from 'express';
import prisma from '../config/db';

export async function createEstimation(req: Request, res: Response) {
  try {
    const { title, sections } = req.body;

    const estimation = await prisma.estimation.create({
      data: {
        title,
        sections: {
          create: sections.map((section: any) => ({
            sectionName: section.sectionName,
            items: {
              create: section.items,
            },
          })),
        },
      },
      include: {
        sections: {
          include: {
            items: true,
          },
        },
      },
    });

    res.status(201).json(estimation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create estimation' });
  }
}

export async function getEstimations(req: Request, res: Response) {
  try {
    const estimations = await prisma.estimation.findMany({
      include: {
        sections: {
          include: {
            items: true,
          },
        },
      },
    });
    res.json(estimations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch estimations' });
  }
}

export async function getEstimationById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const estimation = await prisma.estimation.findUnique({
      where: { id: Number(id) },
      include: {
        sections: {
          include: {
            items: true,
          },
        },
      },
    });
    if (!estimation) return res.status(404).json({ error: 'Estimation not found' });
    res.json(estimation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch estimation' });
  }
}

export async function updateEstimation(req: Request, res: Response) {
  const { id } = req.params;
  const { title, sections } = req.body;

  try {

    await prisma.item.deleteMany({
      where: {
        section: {
          estimationId: Number(id),
        },
      },
    });
    await prisma.section.deleteMany({
      where: {
        estimationId: Number(id),
      },
    });

    const updatedEstimation = await prisma.estimation.update({
      where: { id: Number(id) },
      data: {
        title,
        sections: {
          create: sections.map((section: any) => ({
            sectionName: section.sectionName,
            items: {
              create: section.items,
            },
          })),
        },
      },
      include: {
        sections: {
          include: {
            items: true,
          },
        },
      },
    });

    res.json(updatedEstimation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update estimation' });
  }
}

export async function deleteEstimation(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.item.deleteMany({
      where: {
        section: {
          estimationId: Number(id),
        },
      },
    });
    await prisma.section.deleteMany({
      where: {
        estimationId: Number(id),
      },
    });
    await prisma.estimation.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Estimation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete estimation' });
  }
}
