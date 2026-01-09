import * as Phaser from "phaser";

export default class HUD {
  scene: Phaser.Scene;

  hpText: Phaser.GameObjects.Text;
  waveText: Phaser.GameObjects.Text;
  scoreText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    // ===============================
    // HP
    // ===============================
    this.hpText = scene.add
      .text(16, 16, "HP: 0", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 3
      })
      .setScrollFactor(0)
      .setDepth(5000);

    // ===============================
    // WAVE
    // ===============================
    this.waveText = scene.add
      .text(16, 36, "Wave: 1", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 3
      })
      .setScrollFactor(0)
      .setDepth(5000);

    // ===============================
    // SCORE
    // ===============================
    this.scoreText = scene.add
      .text(16, 56, "Score: 0", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 3
      })
      .setScrollFactor(0)
      .setDepth(5000);
  }

  /* ===============================
     UPDATE
  =============================== */
  update(hp: number, wave: number, score: number) {
    this.hpText.setText(`HP: ${Math.max(0, hp)}`);
    this.waveText.setText(`Wave: ${wave}`);
    this.scoreText.setText(`Score: ${score}`);
  }

  /* ===============================
     DESTROY (OPTIONAL, SAFE)
  =============================== */
  destroy() {
    this.hpText.destroy();
    this.waveText.destroy();
    this.scoreText.destroy();
  }
}
