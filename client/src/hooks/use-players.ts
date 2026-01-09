import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertPlayer } from "@shared/routes";

// GET /api/stats
export function useGameStats() {
  return useQuery({
    queryKey: [api.players.getStats.path],
    queryFn: async () => {
      const res = await fetch(api.players.getStats.path);
      if (!res.ok) throw new Error("Failed to fetch game stats");
      return api.players.getStats.responses[200].parse(await res.json());
    },
    refetchInterval: 60000, // Refresh every minute
  });
}

// POST /api/players
export function useCreatePlayer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertPlayer) => {
      const validated = api.players.create.input.parse(data);
      const res = await fetch(api.players.create.path, {
        method: api.players.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.players.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to register player");
      }

      return api.players.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.players.getStats.path] });
    },
  });
}
