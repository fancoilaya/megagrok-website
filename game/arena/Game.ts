let Phaser: typeof import("phaser");

export async function startArenaGame() {
  if (typeof window === "undefined") return;

  if (!Phaser) {
    Phaser = (await import("phaser")).default;
  }

  const { default: BootScene } = await import("./scenes/BootScene");
  const { default: ArenaScene } = await import("./scenes/ArenaScene");

  new Phaser.Game({
    type: Phaser.AUTO,
    parent: "arena-game",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#060414",
    physics: {
      default: "arcade",
      arcade: { debug: false }
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, ArenaScene]
  });
}
