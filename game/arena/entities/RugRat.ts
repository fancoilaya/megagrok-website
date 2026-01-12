import * as Phaser from "phaser";
import Enemy from "./Enemy";

export default class RugRat extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.sprite.setTexture("rugrat");

    this.maxHp = 22;
    this.hp = this.maxHp;

    this.speed = 180;
    this.defense = 1;
    this.contactDamage = 6;
    this.killPoints = 8;

    this.sprite.setScale(1);
  }
}
