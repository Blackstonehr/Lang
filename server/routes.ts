import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all programs
  app.get("/api/programs", async (_req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch programs" });
    }
  });

  // Get featured programs
  app.get("/api/programs/featured", async (_req, res) => {
    try {
      const programs = await storage.getFeaturedPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured programs" });
    }
  });

  // Get programs by level
  app.get("/api/programs/level/:level", async (req, res) => {
    try {
      const { level } = req.params;
      const programs = await storage.getProgramsByLevel(level);
      res.json(programs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch programs by level" });
    }
  });

  // Get single program
  app.get("/api/programs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const program = await storage.getProgramById(id);
      
      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }
      
      res.json(program);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch program" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Create submission
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({ 
        success: true,
        message: "Thank you for your inquiry! We'll get back to you within 24 hours.",
        submission 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed",
          details: error.errors 
        });
      }
      
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
