import EnemyManager from "../systems/EnemyManager";

/**
 * A spawn function that knows how to spawn
 * one enemy at a position.
 *
 * Tier scaling is handled INSIDE EnemyManager.
 */
export type EnemySpawnFn = (
  enemies: EnemyManager,
  x: number,
  y: number
) => void;

/**
 * Enemy pools per tier.
 *
 * RULES:
 * - Exactly 5 tiers max
 * - Lower tiers never return once unlocked
 * - Only enemies that exist in-game are used
 * - Difficulty scaling is handled in EnemyManager
 */
export const ENEMY_TIERS: Record<number, EnemySpawnFn[]> = {
  /**
   * Tier 1 — Waves 1–5
   */
  1: [
    (e, x, y) => e.spawnHopGoblin(x, y),
    (e, x, y) => e.spawnFudling(x, y),
    (e, x, y) => e.spawnHopSlime(x, y),
    (e, x, y) => e.spawnCroakling(x, y),
    (e, x, y) => e.spawnRugRat(x, y)
  ],

  /**
   * Tier 2 — Waves 6–10
   */
  2: [
    (e, x, y) => e.spawnHopGoblin(x, y),
    (e, x, y) => e.spawnFudling(x, y),
    (e, x, y) => e.spawnHopSlime(x, y),
    (e, x, y) => e.spawnCroakling(x, y),
    (e, x, y) => e.spawnRugRat(x, y)
  ],

  /**
   * Tier 3 — Waves 11–15
   * Weakest enemies start disappearing
   */
  3: [
    (e, x, y) => e.spawnFudling(x, y),
    (e, x, y) => e.spawnHopSlime(x, y),
    (e, x, y) => e.spawnRugRat(x, y)
  ],

  /**
   * Tier 4 — Waves 16–20
   */
  4: [
    (e, x, y) => e.spawnHopSlime(x, y),
    (e, x, y) => e.spawnRugRat(x, y)
  ],

  /**
   * Tier 5 — Waves 21+
   * Endgame tier (scaling continues forever)
   */
  5: [
    (e, x, y) => e.spawnHopSlime(x, y),
    (e, x, y) => e.spawnRugRat(x, y)
  ]
};
