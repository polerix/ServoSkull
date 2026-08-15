# Servitor Skull Registration & Tracking

One entry per physical unit. Copy the block, fill it in, append below
the divider. This is the operative register — keep it current as
units are built, redeployed, or retired.

---

## Register Fields

```
DESIGNATION:            [unit's name/callsign]
CLASS:                  [FIRMWARE-CLASS or LEGACY-CLASS — see PROGRAMMING_REFERENCE.md §1]
  If LEGACY-CLASS, persona/state layer: [what it is — script, config, LLM persona, etc.]
HARDWARE:               [Pi model, notable peripherals — full spec goes in this unit's
                          GPIO map, not here; this is the summary line]
GPIO MAP REF:           [link/path to this unit's specific pin assignments, if it
                          diverges from the FIRMWARE.md template]
COMM CHANNEL:           [local HTTP / SSH-TUI / other]
NETWORK ID:             [hostname, IP, or service number used by the TUI's skulls.json]
FIRST DEPLOYED:         [date/context]
STATUS:                 [ACTIVE / BUILDING / DECOMMISSIONED / LOST / DESTROYED]
STATUS NOTES:           [circumstances, last known state]
LAST UPDATED:           [date]
```

---

## Current Entries

*(none yet — first unit goes here)*
