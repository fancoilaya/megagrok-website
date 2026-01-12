import * as Phaser from "phaser";
import Enemy from "./Enemy";

export default class Croakling extends Enemy {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    onKilled?: (points: number) => void
  ) {
    super(
      scene,
      x,
      y,
      "croakling",
      {
        maxHp: 14,
        damage: 4,
        speed: 150,
        defense: 0,
        attackCooldown: 700,
        contactDamage: 4,
        killPoints: 5
      },
      onKilled
    );

    this.sprite.setScale(0.9);
  }
}
