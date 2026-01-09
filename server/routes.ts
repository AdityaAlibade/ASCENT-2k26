import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.players.create.path, async (req, res) => {
    try {
      const input = api.players.create.input.parse(req.body);
      const player = await storage.createPlayer(input);
      res.status(201).json(player);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.players.getStats.path, async (req, res) => {
    const stats = await storage.getPlayerStats();
    // Calculate next game time (static or dynamic)
    const nextGame = new Date();
    nextGame.setHours(nextGame.getHours() + 48); // 48 hours from now
    
    res.json({
      totalPlayers: stats.totalPlayers,
      nextGameTime: nextGame.toISOString()
    });
  });

  // Seed initial data if empty
  const stats = await storage.getPlayerStats();
  if (stats.totalPlayers === 0) {
    await storage.createPlayer({
      name: "Seong Gi-hun",
      college: "Seoul National University",
      academicYear: "1993",
      department: "Business Administration",
      email: "gihun@squid.game",
      phone: "010-1234-5678"
    });
    await storage.createPlayer({
      name: "Cho Sang-woo",
      college: "Seoul National University",
      academicYear: "1994",
      department: "Business Administration",
      email: "sangwoo@squid.game",
      phone: "010-8765-4321"
    });
  }

  return httpServer;
}
