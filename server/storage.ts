import { db } from "./db";
import { players, type InsertPlayer, type Player } from "@shared/schema";
import { count } from "drizzle-orm";

export interface IStorage {
  createPlayer(player: InsertPlayer): Promise<Player>;
  getPlayerStats(): Promise<{ totalPlayers: number }>;
}

export class DatabaseStorage implements IStorage {
  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const currentCount = await this.getPlayerStats();
    // Assign player number starting from 1 or 456, let's go with sequential 1-456 style logic
    // or just incrementing. 
    // To make it look cool, let's start from a random base or just 1.
    const nextNumber = currentCount.totalPlayers + 1;

    const [player] = await db.insert(players).values({
      ...insertPlayer,
      playerNumber: nextNumber
    }).returning();
    return player;
  }

  async getPlayerStats(): Promise<{ totalPlayers: number }> {
    const [result] = await db.select({ count: count() }).from(players);
    return { totalPlayers: result?.count || 0 };
  }
}

export const storage = new DatabaseStorage();
