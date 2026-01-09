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

  return httpServer;
}
