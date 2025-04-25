import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple endpoint to check API status
  app.get('/api/status', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Note: No API endpoint is needed for fetching doctor data
  // The client will fetch data directly from the provided external API:
  // https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
  
  const httpServer = createServer(app);
  return httpServer;
}
