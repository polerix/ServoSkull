// Phase 1 placeholder: proves the /design route and three-viewport layout.
// Drag-and-drop, the chassis canvas, GPIO tracker, and BOM/firmware
// generator are built in Phases 2–4 — see the project plan.
const DesignBuilder = () => {
  return (
    <div className="flex min-h-screen flex-col bg-black px-6 py-16 sm:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-copperplate text-3xl text-[#D4FFFD] sm:text-4xl">
          ✠ Design Servitor Skull ✠
        </h1>
        <p className="mt-4 text-[#9fd8d4]">
          The builder — drag components onto the chassis, wire up GPIO, and
          generate a bill of materials. Under construction.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-6">
            <h2 className="font-copperplate text-lg text-[#72eaf6]">
              Component Vault
            </h2>
            <p className="mt-2 text-sm text-[#9fd8d4]">
              Optics &amp; Illumination, Telemetry &amp; Input, Core
              Processing, Expansion, Kinematics.
            </p>
          </aside>

          <div className="flex flex-col gap-4">
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-6">
              <div className="text-center">
                <h2 className="font-copperplate text-lg text-[#72eaf6]">
                  Chassis Canvas
                </h2>
                <p className="mt-2 text-sm text-[#9fd8d4]">
                  Ocular Cavities · Cranial Cavity · Temporal/Maxillary
                  Mounts · Cervical/Base
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-6">
              <h2 className="font-copperplate text-lg text-[#72eaf6]">
                Pinout Tracker
              </h2>
              <p className="mt-2 text-sm text-[#9fd8d4]">
                GPIO matrix and connection manifest — populates once a Core
                Processing module is placed on the canvas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignBuilder;
