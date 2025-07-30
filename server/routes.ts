import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Route API de base
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Route pour les effets
  app.get("/api/effects", async (req, res) => {
    try {
      // Placeholder for GitHub API integration
      res.json({ effects: [] });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch effects" });
    }
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
import { Express } from 'express';
import { createServer } from 'http';

export const registerRoutes = async (app: Express) => {
  const server = createServer(app);

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  app.get('/api/effects', (req, res) => {
    res.json({ effects: [] });
  });

  return server;
};
