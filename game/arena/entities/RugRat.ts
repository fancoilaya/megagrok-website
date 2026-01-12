import * as Phaser from "phaser";
import Enemy from "./Enemy";

export default class RugRat extends Enemy {
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
      "rugrat",
      {
        maxHp: 22,
        damage: 6,
        speed: 180,
        defense: 1,
        attackCooldown: 600,
        contactDamage: 6,
        killPoints: 8
      },
      onKilled
    );

    this.sprite.setScale(1);
  }
}
