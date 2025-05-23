import { Request, Response } from "express";
import { DiagramRepo, IDiagramRepo } from "../repositoryBackOffice/DiagramRepo";
import { Diagram } from "../models/Diagram";

interface DiagramElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export class DiagramController {
  private repository: IDiagramRepo;

  constructor(repository: IDiagramRepo = new DiagramRepo()) {
    this.repository = repository;
  }

  async saveDiagram(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({
          status: "Error",
          message: "Authentication required"
        });
      }

      const { facilityId, elements } = req.body;
      const userId = req.user.id;

      if (!facilityId || !elements) {
        return res.status(400).json({
          status: "Error",
          message: "Missing required fields"
        });
      }

      const validElements = elements.map((el: any) => ({
        ...el,
        id: el.id || Date.now().toString(),
        x: Number(el.x) || 0,
        y: Number(el.y) || 0,
        width: Number(el.width) || 100,
        height: Number(el.height) || 100
      }));

      const diagram = await this.repository.saveOrUpdate(
        Number(facilityId),
        String(userId),
        validElements
      );

      return res.json({
        status: "Success",
        data: diagram
      });
    } catch (err) {
      console.error("Error in saveDiagram:", err);
      return res.status(500).json({
        status: "Error",
        message: err instanceof Error ? err.message : "Unknown error"
      });
    }
  }

  async getDiagram(req: Request, res: Response) {
    try {
      const { facilityId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          status: "Error",
          message: "Authentication required"
        });
      }

      const diagram = await this.repository.getByFacilityAndUser(
        Number(facilityId),
        String(userId)
      );

      return res.json({
        status: "Success",
        data: diagram
      });
    } catch (err) {
      console.error("Error in getDiagram:", err);
      return res.status(500).json({
        status: "Error",
        message: err instanceof Error ? err.message : "Unknown error"
      });
    }
  }
}

export default new DiagramController();