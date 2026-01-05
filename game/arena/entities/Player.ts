import * as Phaser from "phaser";

export default class Player {
  scene: Phaser.Scene;
  sprite: Phaser.Physics.Arcade.Sprite;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  attackKey: Phaser.Input.Keyboard.Key;

  speed = 350;
  attackCooldown = 350;
  lastAttack = 0;

  shadow: Phaser.GameObjects.Ellipse;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    // === PLAYER SPRITE ===
    this.sprite = scene.physics.add
      .sprite(x, y, "grok")
      .setCollideWorldBounds(true);

    // Scale & layering (smaller, snappier)
    this.sprite.setScale(0.32);
    this.sprite.setDepth(10);

    // === GROUND SHADOW ===
    this.shadow = scene.add.ellipse(
      x,
      y + 18,
      60,
      22,
      0x000000,
      0.35
    );
    this.shadow.setDepth(5);

    // === INPUT ===
    this.cursors = scene.input.keyboard!.createCursorKeys();

    this.keys = scene.input.keyboard!.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D
    }) as any;

    this.attackKey = scene.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update(_: number) {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0);

    // === MOVEMENT ===
    if (this.cursors.left?.isDown || this.keys.A.isDown) {
      body.setVelocityX(-this.speed);
    } else if (this.cursors.right?.isDown || this.keys.D.isDown) {
      body.setVelocityX(this.speed);
    }

    if (this.cursors.up?.isDown || this.keys.W.isDown) {
      body.setVelocityY(-this.speed);
    } else if (this.cursors.down?.isDown || this.keys.S.isDown) {
      body.setVelocityY(this.speed);
    }

    body.velocity.normalize().scale(this.speed);

    // === ATTACK ===
    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
      const now = this.scene.time.now;
      if (now - this.lastAttack > this.attackCooldown) {
        this.lastAttack = now;
        this.performAttack();
      }
    }

    // === SYNC SHADOW ===
    this.shadow.x = this.sprite.x;
    this.shadow.y = this.sprite.y + 18;
  }

  performAttack() {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;

    // Determine strike direction
    let dirX = 0;
    let dirY = 0;

    if (body.velocity.x !== 0 || body.velocity.y !== 0) {
      dirX = Math.sign(body.velocity.x);
      dirY = Math.sign(body.velocity.y);
    } else {
      // Default forward strike
      dirY = 1;
    }

    // === LUNGE FORWARD ===
    this.scene.tweens.add({
      targets: this.sprite,
      x: this.sprite.x + dirX * 12,
      y: this.sprite.y + dirY * 12,
      duration: 80,
      ease: "Power2",
      yoyo: true
    });

    // === SCALE PUNCH ===
    this.scene.tweens.add({
      targets: this.sprite,
      scale: 0.46,
      duration: 60,
      yoyo: true
    });

    // === HIT FLASH ===
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.7,
      duration: 40,
      yoyo: true
    });

    // === SHADOW REACTION ===
    this.scene.tweens.add({
      targets: this.shadow,
      scaleX: 0.8,
      scaleY: 0.8,
      duration: 60,
      yoyo: true
    });
  }
}
