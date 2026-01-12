import * as Phaser from "phaser";
import Enemy from "../entities/Enemy";
import HopGoblin from "../entities/HopGoblin";
import HopSlime from "../entities/HopSlime";
import Fudling from "../entities/Fudling";
import Croakling from "../entities/Croakling";
import RugRat from "../entities/RugRat";

export default class EnemyManager {
  scene: Phaser.Scene;
  enemies: Enemy[] = [];
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

private applyTierScaling(enemy: Enemy, tier: number) {
  if (tier <= 1) return;

  enemy.maxHp = Math.floor(enemy.maxHp * (1 + tier * 0.35));
  enemy.hp = enemy.maxHp;

  // Melee enemies
  enemy.contactDamage = Math.floor(
    enemy.contactDamage * (1 + tier * 0.25)
  );

  enemy.speed *= 1 + tier * 0.05;
}

  // =========================
  // SPAWN HELPERS
  // =========================

  spawnHopGoblin(x: number, y: number, tier: number = 1) {
    const e = new HopGoblin(this.scene, x, y, pts => {
      this.onEnemyKilled?.(pts);
    });

    this.applyTierScaling(e, tier);
    this.enemies.push(e);
  }

  spawnHopSlime(x: number, y: number, tier: number = 1) {
    const e = new HopSlime(this.scene, x, y, pts => {
      this.onEnemyKilled?.(pts);
    });

    this.applyTierScaling(e, tier);
    this.enemies.push(e);
  }

  spawnFudling(x: number, y: number, tier: number = 1) {
    const e = new Fudling(this.scene, x, y, pts => {
      this.onEnemyKilled?.(pts);
    });

    this.applyTierScaling(e, tier);
    this.enemies.push(e);
  }

  spawnCroakling(x: number, y: number, tier: number = 1) {
  const e = new Croakling(this.scene, x, y);

  this.applyTierScaling(e, tier);
  this.enemies.push(e);
}

spawnRugRat(x: number, y: number, tier: number = 1) {
  const e = new RugRat(this.scene, x, y);

  this.applyTierScaling(e, tier);
  this.enemies.push(e);
}


  // =========================
  // UPDATE LOOP
  // =========================

  update(playerSprite: Phaser.Physics.Arcade.Sprite) {
    // Remove dead enemies
    this.enemies = this.enemies.filter(e => e.sprite.active);

    // Prevent stacking
    this.applySeparation();

    for (const enemy of this.enemies) {
      enemy.update(playerSprite);
    }
  }

  // =========================
  // TARGETING
  // =========================

  getClosestEnemy(
    x: number,
    y: number,
    maxDistance: number
  ): Enemy | null {
    let closest: Enemy | null = null;
    let closestDist = maxDistance;

    for (const enemy of this.enemies) {
      if (!enemy.sprite.active) continue;

      const dx = enemy.sprite.x - x;
      const dy = enemy.sprite.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < closestDist) {
        closestDist = dist;
        closest = enemy;
      }
    }

    return closest;
  }

  // =========================
  // SEPARATION (ANTI-STACK)
  // =========================

  applySeparation() {
    const minDist = 26;

    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = i + 1; j < this.enemies.length; j++) {
        const a = this.enemies[i].sprite;
        const b = this.enemies[j].sprite;

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
  // CLEANUP
  // =========================

  clearAll() {
    for (const enemy of this.enemies) {
      enemy.sprite.destroy();
      enemy.hpBar.destroy();
      enemy.hpBarBg.destroy();
    }
    this.enemies = [];
  }
}
