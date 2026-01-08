let PhaserRef: typeof import("phaser");

export async function startArenaGame() {
  if (typeof window === "undefined") return;

  if (!PhaserRef) {
    PhaserRef = await import("phaser");
  }

  const { default: BootScene } = await import("./scenes/BootScene");
  const { default: ArenaScene } = await import("./scenes/ArenaScene");

  const Phaser = PhaserRef;

  new Phaser.Game({
    type: Phaser.AUTO,
    parent: "arena-game",

    width: window.innerWidth,
    height: window.innerHeight,

    backgroundColor: "#060414",

    // ✅ REQUIRED FOR SCORE SUBMISSION INPUTS
    dom: {
      createContainer: true
    },

    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    },

    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene: [BootScene, ArenaScene]
  });
}
