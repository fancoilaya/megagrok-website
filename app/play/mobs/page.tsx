export default function MobsPage() {
  const TIERS = [
    {
      id: 1,
      name: "Tier I — Common",
      mobs: [
        {
          name: "FUDling",
          type: "Shadow-Amphibian",
          description:
            "A small creature born from fear, uncertainty, and doubt. It feeds on weak charts and shaky hands.",
          strength: "Spreading panic",
          weakness: "Confidence",
          image: "/game/enemies/tier_1/fudling.png"
        },
        {
          name: "HopGoblin",
          type: "Chaotic Hopper",
          description:
            "A mischievous creature that channels raw hop-energy and causes trouble in liquidity pools.",
          strength: "Fast attacks",
          weakness: "Calmness",
          image: "/game/enemies/tier_1/hopgoblin.png"
        },
        {
          name: "Croakling",
          type: "Pond Spawn",
          description:
            "A tiny frog-gremlin found in noisy packs, overwhelming careless travelers.",
          strength: "Swarm tactics",
          weakness: "Area attacks",
          image: "/game/enemies/tier_1/croakling.png"
        },
        {
          name: "RugRat",
          type: "Trickster",
          description:
            "A tiny creature that loves tangling rugs, wallets, and expectations.",
          strength: "Stealth",
          weakness: "Direct combat",
          image: "/game/enemies/tier_1/rugrat.png"
        },
        {
          name: "HopSlime",
          type: "Goo",
          description:
            "A sticky slime humming with unstable hop-energy.",
          strength: "Sticky slowdowns",
          weakness: "Fire / heat",
          image: "/game/enemies/tier_1/hopslime.png"
        }
      ]
    },

    {
      id: 2,
      name: "Tier II — Uncommon",
      mobs: [
        {
          name: "DoomHopper",
          type: "Abyssal Hopper",
          description:
            "Forged in Rugnarok depths, DoomHopper leaps through shadows with destructive force.",
          strength: "Burst damage",
          weakness: "Light",
          image: "/game/enemies/tier_2/doomhopper.png"
        },
        {
          name: "LiquiDrip",
          type: "Slime",
          description:
            "An ooze that leeches liquidity and drains momentum.",
          strength: "Drain over time",
          weakness: "Burst damage",
          image: "/game/enemies/tier_2/liquidrip.png"
        },
        {
          name: "PanicPuff",
          type: "Gas",
          description:
            "A jittery cloud spreading panic across the battlefield.",
          strength: "Confusion",
          weakness: "Dispersal",
          image: "/game/enemies/tier_2/panicpuff.png"
        },
        {
          name: "GreedImp",
          type: "Imp",
          description:
            "A coin-hoarding imp chasing every spike it sees.",
          strength: "Loot stealing",
          weakness: "Patience",
          image: "/game/enemies/tier_2/greedimp.png"
        },
        {
          name: "FUDSprite",
          type: "Elemental",
          description:
            "A whispering sprite that spreads doubt mid-combat.",
          strength: "Rapid hits",
          weakness: "Direct focus",
          image: "/game/enemies/tier_2/fudsprite.png"
        }
      ]
    },

    {
      id: 3,
      name: "Tier III — Rare",
      mobs: [
        {
          name: "BearOgre",
          type: "Market Titan",
          description:
            "A colossal brute awakened during red markets.",
          strength: "Massive HP",
          weakness: "Bullish sentiment",
          image: "/game/enemies/tier_3/bearogre.png"
        },
        {
          name: "BullSerpent",
          type: "Serpent",
          description:
            "A spirit of bullish momentum with piercing strikes.",
          strength: "High crit chance",
          weakness: "Crowd control",
          image: "/game/enemies/tier_3/bullserpent.png"
        },
        {
          name: "CandleWraith",
          type: "Volatility",
          description:
            "A ghost born from unstable candles and market swings.",
          strength: "Volatile attacks",
          weakness: "Stability",
          image: "/game/enemies/tier_3/candlewraith.png"
        },
        {
          name: "FearHound",
          type: "Hunter",
          description:
            "A spectral predator tracking wavering resolve.",
          strength: "Tracking weak targets",
          weakness: "Steadiness",
          image: "/game/enemies/tier_3/fearhound.png"
        },
        {
          name: "RugFiend",
          type: "Demon",
          description:
            "A malicious demon thriving on rug-pulls.",
          strength: "High burst damage",
          weakness: "Sustained defense",
          image: "/game/enemies/tier_3/rugfiend.png"
        }
      ]
    },

    {
      id: 4,
      name: "Tier IV — Epic",
      mobs: [
        {
          name: "FomoBeast",
          type: "Parabolic Entity",
          description:
            "A hype-born monster growing stronger with every green candle.",
          strength: "Explosive growth",
          weakness: "Patience",
          image: "/game/enemies/tier_4/fomobeast.png"
        },
        {
          name: "Liquidator Alpha",
          type: "Executioner",
          description:
            "The embodiment of forced liquidation.",
          strength: "Finishing moves",
          weakness: "Counterplay windows",
          image: "/game/enemies/tier_4/liquidatoralpha.png"
        },
        {
          name: "Rekt Titan",
          type: "Titan",
          description:
            "A massive being born from catastrophic losses.",
          strength: "Devastating hits",
          weakness: "Mobility",
          image: "/game/enemies/tier_4/rekttitan.png"
        },
        {
          name: "HopReaver",
          type: "Reaver",
          description:
            "A scythe-wielding assassin of momentum.",
          strength: "Crit & bleed",
          weakness: "Predictable patterns",
          image: "/game/enemies/tier_4/hopreaver.png"
        },
        {
          name: "Oracle Phantom",
          type: "Seer",
          description:
            "A phantom manipulating chart-lines and foresight.",
          strength: "Dodging & prediction",
          weakness: "Direct pressure",
          image: "/game/enemies/tier_4/oraclephantom.png"
        }
      ]
    },

    {
      id: 5,
      name: "Tier V — Legendary",
      mobs: [
        {
          name: "Hopocalypse",
          type: "Titanic Entity",
          description:
            "A world-ending hop titan warping reality itself.",
          strength: "Cosmic attacks",
          weakness: "Coordination",
          image: "/game/enemies/tier_5/hopocalypse.png"
        },
        {
          name: "Rugnarok Prime",
          type: "Rug Demon",
          description:
            "The ultimate rug demon tearing reality apart.",
          strength: "Reality warping",
          weakness: "Anchored defense",
          image: "/game/enemies/tier_5/rugnarokprime.png"
        },
        {
          name: "ChartShatter Dragon",
          type: "Dragon",
          description:
            "A dragon formed from shattered charts and volatility.",
          strength: "Area pressure",
          weakness: "Sustained defense",
          image: "/game/enemies/tier_5/chartshatterdragon.png"
        },
        {
          name: "MegaFOMO Titan",
          type: "Titan",
          description:
            "A frenzy-fueled titan growing stronger with fear.",
          strength: "Scaling power",
          weakness: "Calm coordination",
          image: "/game/enemies/tier_5/megafomotitan.png"
        },
        {
          name: "Liquidity Leviathan",
          type: "Leviathan",
          description:
            "A cosmic deep-sea monster controlling liquidity tides.",
          strength: "Battlefield control",
          weakness: "Surface pressure",
          image: "/game/enemies/tier_5/liquidityleviathan.png"
        }
      ]
    }
  ];

  return (
    <main className="container">
      <section className="hero">
        <h1>GROKDEX</h1>
        <p>
          A living index of creatures inhabiting the MegaGrok universe.
          Study them. Prepare. Survive.
        </p>
      </section>

      {TIERS.map((tier) => (
        <section key={tier.id} style={{ marginTop: 56 }}>
          <h2 className="section-title">{tier.name}</h2>

          <div className="grid">
            {tier.mobs.map((mob) => (
              <div key={mob.name} className="panel">
                <img
                  src={mob.image}
                  alt={mob.name}
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    marginBottom: 12
                  }}
                />

                <h3>{mob.name}</h3>
                <p style={{ opacity: 0.7 }}>{mob.type}</p>

                <p style={{ marginTop: 8 }}>{mob.description}</p>

                <p style={{ marginTop: 8 }}>
                  <strong>Strength:</strong> {mob.strength}
                  <br />
                  <strong>Weakness:</strong> {mob.weakness}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
