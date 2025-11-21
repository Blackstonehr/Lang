import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

// Rate limiting configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limit for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact submissions per hour
  message: "Too many contact form submissions. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply general API rate limiting
  app.use("/api", apiLimiter);

  // Get all programs
  app.get("/api/programs", async (_req: Request, res: Response) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ 
        error: "Failed to fetch programs",
        message: "An error occurred while loading programs. Please try again later."
      });
    }
  });

  // Get featured programs
  app.get("/api/programs/featured", async (_req: Request, res: Response) => {
    try {
      const programs = await storage.getFeaturedPrograms();
      res.json(programs);
    } catch (error) {
      console.error("Error fetching featured programs:", error);
      res.status(500).json({ 
        error: "Failed to fetch featured programs",
        message: "An error occurred while loading featured programs. Please try again later."
      });
    }
  });

  // Get programs by level
  app.get("/api/programs/level/:level", async (req: Request, res: Response) => {
    try {
      const { level } = req.params;
      const programs = await storage.getProgramsByLevel(level);
      res.json(programs);
    } catch (error) {
      console.error("Error fetching programs by level:", error);
      res.status(500).json({ 
        error: "Failed to fetch programs by level",
        message: "An error occurred while filtering programs. Please try again later."
      });
    }
  });

  // Get single program
  app.get("/api/programs/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (!id || id.trim() === "") {
        return res.status(400).json({ 
          error: "Invalid program ID",
          message: "Program ID is required."
        });
      }
      
      const program = await storage.getProgramById(id);
      
      if (!program) {
        return res.status(404).json({ 
          error: "Program not found",
          message: "The requested program could not be found."
        });
      }
      
      res.json(program);
    } catch (error) {
      console.error("Error fetching program:", error);
      res.status(500).json({ 
        error: "Failed to fetch program",
        message: "An error occurred while loading the program. Please try again later."
      });
    }
  });

  // Submit contact form (with stricter rate limiting)
  app.post("/api/contact", contactLimiter, async (req: Request, res: Response) => {
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
          details: error.errors.map(err => ({
            field: err.path.join("."),
            message: err.message
          }))
        });
      }
      
      console.error("Contact form submission error:", error);
      res.status(500).json({ 
        error: "Failed to submit contact form",
        message: "An unexpected error occurred. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
