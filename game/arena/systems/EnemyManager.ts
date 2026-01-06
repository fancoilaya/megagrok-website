import Enemy from "../entities/Enemy";
import * as Phaser from "phaser";

export default class EnemyManager {
  scene: Phaser.Scene;
  enemies: Enemy[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  spawn(x: number, y: number) {
    const enemy = new Enemy(this.scene, x, y);
    this.enemies.push(enemy);
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    this.enemies = this.enemies.filter(e => e.sprite.active);

    for (const enemy of this.enemies) {
      enemy.update(player);
    }
  }

  /** Returns the closest enemy within range */
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
