import * as Phaser from "phaser";
import Enemy from "./Enemy";

export default class Croakling extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "croakling");

    this.maxHp = 14;
    this.hp = this.maxHp;
    this.damage = 4;
    this.speed = 150;
    this.defense = 0;
    this.contactDamage = 4;
    this.killPoints = 5;
    this.attackCooldown = 700;

    this.sprite.setScale(0.9);
  }
}
