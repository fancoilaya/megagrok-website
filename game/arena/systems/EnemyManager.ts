import * as Phaser from "phaser";
import Enemy from "../entities/Enemy";
import HopGoblin from "../entities/HopGoblin";

export default class EnemyManager {
  scene: Phaser.Scene;
  enemies: Enemy[] = [];

  onEnemyKilled?: (points: number) => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  spawnHopGoblin(x: number, y: number) {
    const enemy = new HopGoblin(
      this.scene,
      x,
      y,
      (points: number) => {
        if (this.onEnemyKilled) {
          this.onEnemyKilled(points);
        }
      }
    );
    this.enemies.push(enemy);
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    // Remove dead enemies
    this.enemies = this.enemies.filter(e => e.sprite.active);

    // === SEPARATION (NO STACKING) ===
    this.applySeparation();

    // Update each enemy
    for (const enemy of this.enemies) {
      enemy.update(player);
    }
  }

  applySeparation() {
    const minDist = 32;

    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = i + 1; j < this.enemies.length; j++) {
        const a = this.enemies[i].sprite;
        const b = this.enemies[j].sprite;

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

  getClosestEnemy(
    x: number,
    y: number,
    range: number
  ): Enemy | null {
    let closest: Enemy | null = null;
    let closestDist = range;

    for (const enemy of this.enemies) {
      const d = Phaser.Math.Distance.Between(
        x,
        y,
        enemy.sprite.x,
        enemy.sprite.y
      );

      if (d < closestDist) {
        closestDist = d;
        closest = enemy;
      }
    }

    return closest;
  }
}
