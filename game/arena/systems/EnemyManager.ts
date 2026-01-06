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
    this.enemies = this.enemies.filter(e => e.sprite.active);

    for (const enemy of this.enemies) {
      enemy.update(player);
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
