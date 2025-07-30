import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
import { Express } from "express";
import { createServer } from "http";

export function registerRoutes(app: Express) {
  // Route API de base
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Route pour les effets (à implémenter selon vos besoins)
  app.get("/api/effects", (req, res) => {
    res.json({ effects: [] });
  });

  // Créer le serveur HTTP
  const server = createServer(app);
  
  return server;
}
