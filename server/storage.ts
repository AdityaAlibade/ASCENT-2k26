import { db } from "./db";
import { players, type InsertPlayer, type Player } from "@shared/schema";
import { count } from "drizzle-orm";

export interface IStorage {
  createPlayer(player: InsertPlayer): Promise<Player>;
  getPlayerStats(): Promise<{ totalPlayers: number }>;
}

/**
 * In-memory fallback when DB is disabled
 * This keeps the app alive in dev / demo mode
 */
const memoryPlayers: Player[] = [];

export class DatabaseStorage implements IStorage {
  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    // 🔴 DB DISABLED → USE MEMORY
    if (!db) {
      const player: Player = {
        id: memoryPlayers.length + 1,
        playerNumber: memoryPlayers.length + 1,
        ...insertPlayer,
      } as Player;

      memoryPlayers.push(player);
      return player;
    }

    // 🟢 DB ENABLED → NORMAL FLOW
    const currentCount = await this.getPlayerStats();
    const nextNumber = currentCount.totalPlayers + 1;

    const [player] = await db
      .insert(players)
      .values({
        ...insertPlayer,
        playerNumber: nextNumber,
      })
      .returning();

    return player;
  }

  async getPlayerStats(): Promise<{ totalPlayers: number }> {
    // 🔴 DB DISABLED → MEMORY COUNT
    if (!db) {
      return { totalPlayers: memoryPlayers.length };
    }

    // 🟢 DB ENABLED → DB COUNT
    const [result] = await db
      .select({ count: count() })
      .from(players);

    return { totalPlayers: Number(result?.count ?? 0) };
  }
}

export const storage = new DatabaseStorage();
