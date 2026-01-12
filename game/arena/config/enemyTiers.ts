import EnemyManager from "../systems/EnemyManager";

/**
 * A spawn function that knows how to spawn
 * one enemy at a position with a tier.
 */
export type EnemySpawnFn = (
  enemies: EnemyManager,
  x: number,
  y: number,
  tier: number
) => void;

/**
 * Enemy pools per tier.
 *
 * IMPORTANT RULES:
 * - Exactly 5 tiers max
 * - Lower tiers are never used again once unlocked
 * - Only enemies that actually exist in-game are listed
 * - Scaling (HP / damage / speed) makes higher tiers dangerous
 */
export const ENEMY_TIERS: Record<number, EnemySpawnFn[]> = {
  /**
   * Tier 1 — Waves 1–5
   * Intro enemies only
   */
  1: [
    (e, x, y, t) => e.spawnHopGoblin(x, y, t),
    (e, x, y, t) => e.spawnFudling(x, y, t),
    (e, x, y, t) => e.spawnHopSlime(x, y, t)
  ],

  /**
   * Tier 2 — Waves 6–10
   * Same enemies, but noticeably stronger
   */
  2: [
    (e, x, y, t) => e.spawnHopGoblin(x, y, t),
    (e, x, y, t) => e.spawnFudling(x, y, t),
    (e, x, y, t) => e.spawnHopSlime(x, y, t)
  ],

  /**
   * Tier 3 — Waves 11–15
   * Weakest enemies start disappearing
   */
  3: [
    (e, x, y, t) => e.spawnFudling(x, y, t),
    (e, x, y, t) => e.spawnHopSlime(x, y, t)
  ],

  /**
   * Tier 4 — Waves 16–20
   * High-pressure enemies only
   */
  4: [
    (e, x, y, t) => e.spawnHopSlime(x, y, t)
  ],

  /**
   * Tier 5 — Waves 21+
   * Endgame tier (scaling continues forever)
   */
  5: [
    (e, x, y, t) => e.spawnHopSlime(x, y, t)
  ]
};
