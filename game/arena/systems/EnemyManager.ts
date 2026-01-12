import * as Phaser from "phaser";
import Enemy from "../entities/Enemy";
import HopGoblin from "../entities/HopGoblin";
import HopSlime from "../entities/HopSlime";
import Fudling from "../entities/Fudling";
import Croakling from "../entities/Croakling";
import RugRat from "../entities/RugRat";

/**
 * Minimal runtime contract for arena enemies.
 * All entities in /entities satisfy this at runtime.
 */
type ArenaEnemy = {
  sprite: Phaser.GameObjects.GameObject & { active: boolean };
  update(player: Phaser.Physics.Arcade.Sprite): void;
  maxHp: number;
  hp: number;
  speed: number;
  damage?: number;
};

export default class EnemyManager {
  scene: Phaser.Scene;
  enemies: ArenaEnemy[] = [];
  onEnemyKilled?: (points: number) => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  // =========================
  // SCALING
  // =========================

  private getStatMultiplier(tier: number) {
    return {
      hp: 1 + tier * 0.35,
      damage: 1 + tier * 0.25,
      speed: 1 + tier * 0.05
    };
  }

  private applyTierScaling(enemy: ArenaEnemy, tier: number) {
    if (!tier || tier <= 1) return;

    const mult = this.getStatMultiplier(tier);

    enemy.maxHp = Math.floor(enemy.maxHp * mult.hp);
    enemy.hp = enemy.maxHp;

    if (typeof enemy.damage === "number") {
      enemy.damage = Math.floor(enemy.damage * mult.damage);
    }

    enemy.speed *= mult.speed;
  }

    // =========================
  // TARGETING
  // =========================

  getClosestEnemy(
    x: number,
    y: number,
    maxDistance: number
  ): ArenaEnemy | null {
    let closest: ArenaEnemy | null = null;
    let closestDist = maxDistance;

    for (const enemy of this.enemies) {
      if (!enemy.sprite.active) continue;

      const ex = (enemy.sprite as any).x;
      const ey = (enemy.sprite as any).y;

      const dx = ex - x;
      const dy = ey - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < closestDist) {
        closestDist = dist;
        closest = enemy;
      }
    }

    return closest;
  }


  // =========================
  // SPAWN HELPERS
  // =========================

  spawnHopGoblin(x: number, y: number, tier: number = 1) {
    const e = new HopGoblin(this.scene, x, y, pts => {
      if (this.onEnemyKilled) this.onEnemyKilled(pts);
    });

    this.applyTierScaling(e, tier);
    this.enemies.push(e);
  }

  spawnHopSlime(x: number, y: number, tier: number = 1) {
    const e = new HopSlime(this.scene, x, y, pts => {
      if (this.onEnemyKilled) this.onEnemyKilled(pts);
    });

    this.applyTierScaling(e, tier);
    this.enemies.push(e);
  }

  spawnFudling(x: number, y: number, tier: number = 1) {
    const e = new Fudling(this.scene, x, y, pts => {
      if (this.onEnemyKilled) this.onEnemyKilled(pts);
    });

    this.applyTierScaling(e, tier);
    this.enemies.push(e);
  }

  spawnCroakling(x: number, y: number, tier: number = 1) {
    const e = new Croakling(this.scene, x, y);

    this.applyTierScaling(e, tier);

    e.onDeath = () => {
      if (this.onEnemyKilled) this.onEnemyKilled(5);
    };

    this.enemies.push(e);
  }

  spawnRugRat(x: number, y: number, tier: number = 1) {
    const e = new RugRat(this.scene, x, y);

    this.applyTierScaling(e, tier);

    e.onDeath = () => {
      if (this.onEnemyKilled) this.onEnemyKilled(8);
    };

    this.enemies.push(e);
  }

  // =========================
  // UPDATE LOOP
  // =========================

  update(playerSprite: Phaser.Physics.Arcade.Sprite) {
    this.enemies = this.enemies.filter(e => e.sprite.active);

    this.applySeparation();

    for (const enemy of this.enemies) {
      enemy.update(playerSprite);
    }
  }

  // =========================
  // SEPARATION (ANTI-STACK)
  // =========================

  applySeparation() {
    const minDist = 26;

    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = i + 1; j < this.enemies.length; j++) {
        const a = this.enemies[i].sprite as any;
        const b = this.enemies[j].sprite as any;

        if (!a.active || !b.active) continue;

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0 && dist < minDist) {
          const push = (minDist - dist) * 0.5;
          const nx = dx / dist;
          const ny = dy / dist;

          a.x += nx * push;
          a.y += ny * push;
          b.x -= nx * push;
          b.y -= ny * push;
        }
      }
    }
  }

  // =========================
  // CLEANUP (BETWEEN WAVES / RESET)
  // =========================

  clearAll() {
    for (const enemy of this.enemies) {
      enemy.sprite.destroy();
    }
    this.enemies = [];
  }
}
