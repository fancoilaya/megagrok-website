import * as Phaser from "phaser";

export default class Enemy {
  scene: Phaser.Scene;
  sprite: Phaser.Physics.Arcade.Sprite;

  maxHp = 40;
  hp = 40;
  defense = 2;
  speed = 120;

  killPoints = 100;

  hpBarBg: Phaser.GameObjects.Rectangle;
  hpBar: Phaser.GameObjects.Rectangle;

  onDeath?: (points: number) => void;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    onDeath?: (points: number) => void
  ) {
    this.scene = scene;
    this.onDeath = onDeath;

    this.sprite = scene.physics.add
      .sprite(x, y, "enemy-basic")
      .setCollideWorldBounds(true);

    this.sprite.setScale(0.35);

    this.hpBarBg = scene.add.rectangle(x, y - 18, 28, 4, 0x000000);
    this.hpBar = scene.add.rectangle(x, y - 18, 28, 4, 0xff3333);

    this.hpBarBg.setDepth(100);
    this.hpBar.setDepth(101);
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    const dx = player.x - this.sprite.x;
    const dy = player.y - this.sprite.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const stopDistance = 28;

    if (dist > stopDistance) {
      const nx = dx / dist;
      const ny = dy / dist;
      this.sprite.setVelocity(nx * this.speed, ny * this.speed);
    } else {
      this.sprite.setVelocity(0, 0);
    }

    this.hpBarBg.setPosition(this.sprite.x, this.sprite.y - 18);
    this.hpBar.setPosition(this.sprite.x, this.sprite.y - 18);

    this.sprite.setDepth(this.sprite.y);
    this.hpBarBg.setDepth(this.sprite.y + 1);
    this.hpBar.setDepth(this.sprite.y + 2);
  }

  takeDamage(rawDamage: number, fromX: number, fromY: number) {
    const finalDamage = Math.max(1, rawDamage - this.defense);
    this.hp -= finalDamage;

    // Floating damage number
    const dmgText = this.scene.add.text(
      this.sprite.x,
      this.sprite.y - 28,
      `-${finalDamage}`,
      {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "#ff4444",
        stroke: "#000000",
        strokeThickness: 2
      }
    );
    dmgText.setOrigin(0.5);
    dmgText.setDepth(1000);

    this.scene.tweens.add({
      targets: dmgText,
      y: dmgText.y - 16,
      alpha: 0,
      duration: 500,
      onComplete: () => dmgText.destroy()
    });

    // Knockback
    const dx = this.sprite.x - fromX;
    const dy = this.sprite.y - fromY;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;

    this.sprite.setVelocity(
      (dx / len) * 160,
      (dy / len) * 160
    );

    // Hit flash
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.6,
      duration: 60,
      yoyo: true
    });

    const hpRatio = Phaser.Math.Clamp(this.hp / this.maxHp, 0, 1);
    this.hpBar.width = 28 * hpRatio;

    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this.hpBar.destroy();
    this.hpBarBg.destroy();
    this.sprite.destroy();

    if (this.onDeath) {
      this.onDeath(this.killPoints);
    }
  }
}
