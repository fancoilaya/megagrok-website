import * as Phaser from "phaser";
import EnemyManager from "../systems/EnemyManager";

export default class Player {
  scene: Phaser.Scene;
  sprite: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: any;

  speed = 260;
  hp = 100;
  maxHp = 100;

  // === ATTACK ===
  attackCooldown = 420;
  lastAttack = 0;
  attackRange = 80; // ⬅️ increased range

  enemyManager: EnemyManager;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    enemyManager: EnemyManager
  ) {
    this.scene = scene;
    this.enemyManager = enemyManager;

    this.sprite = scene.physics.add
      .sprite(x, y, "grok")
      .setCollideWorldBounds(true);

    (this.sprite.body as Phaser.Physics.Arcade.Body).setImmovable(true);

    this.sprite.setScale(0.38);
    this.sprite.setDepth(this.sprite.y);
    this.sprite.setData("ref", this);

    const keyboard = scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin;
    this.cursors = keyboard.createCursorKeys();
    this.keys = keyboard.addKeys("W,A,S,D,SPACE");
  }

  update(delta: number) {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;

    let vx = 0;
    let vy = 0;

    if (this.cursors.left?.isDown || this.keys.A?.isDown) vx = -1;
    if (this.cursors.right?.isDown || this.keys.D?.isDown) vx = 1;
    if (this.cursors.up?.isDown || this.keys.W?.isDown) vy = -1;
    if (this.cursors.down?.isDown || this.keys.S?.isDown) vy = 1;

    body.setVelocity(vx * this.speed, vy * this.speed);

    // Facing
    if (vx !== 0) {
      this.sprite.setFlipX(vx < 0);
    }

    this.sprite.setDepth(this.sprite.y);

    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
      this.performAttack();
    }
  }

  performAttack() {
    const now = this.scene.time.now;
    if (now - this.lastAttack < this.attackCooldown) return;
    this.lastAttack = now;

    const dirX = this.sprite.flipX ? -1 : 1;

    // === VISUAL ORIGIN (FURTHER OUT) ===
    const waveX = this.sprite.x + dirX * 42;
    const waveY = this.sprite.y;

    // === ENERGY SHOCKWAVE ===
    const wave = this.scene.add.rectangle(
      waveX,
      waveY,
      56, // width = reach
      16, // height = force thickness
      0xff3b3b,
      0.45
    );

    wave.setDepth(this.sprite.y + 1);
    wave.rotation = dirX < 0 ? Math.PI : 0;

    this.scene.tweens.add({
      targets: wave,
      scaleX: 1.8,
      alpha: 0,
      duration: 140,
      onComplete: () => wave.destroy()
    });

    // === BODY SNAP (SELL FORCE) ===
    this.scene.tweens.add({
      targets: this.sprite,
      x: this.sprite.x + dirX * 8,
      duration: 70,
      yoyo: true
    });

    // === HIT DETECTION (RANGE-BASED) ===
    const enemy = this.enemyManager.getClosestEnemy(
      this.sprite.x,
      this.sprite.y,
      this.attackRange
    );

    if (enemy) {
      const dmg = Phaser.Math.Between(8, 14);
      enemy.takeDamage(dmg, this.sprite.x, this.sprite.y);

      // Damage number
      const dmgText = this.scene.add.text(
        enemy.sprite.x,
        enemy.sprite.y - 20,
        `-${dmg}`,
        {
          fontSize: "14px",
          color: "#ff4b4b",
          fontFamily: "monospace"
        }
      );

      dmgText.setDepth(enemy.sprite.y + 10);

      this.scene.tweens.add({
        targets: dmgText,
        y: dmgText.y - 18,
        alpha: 0,
        duration: 500,
        onComplete: () => dmgText.destroy()
      });
    }
  }

  takeDamage(amount: number) {
    this.hp = Math.max(0, this.hp - amount);

    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.7,
      duration: 40,
      yoyo: true
    });
  }
}
