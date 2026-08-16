# Servitor Skull Registration & Tracking

One entry per physical unit. The operative register itself lives in
[`src/data/units.json`](../src/data/units.json) and renders live at
[`/codex/registration-tracking`](https://polerix.github.io/ServoSkull/#/codex/registration-tracking)
— this file documents the schema those entries follow. Keep the two in
sync: if a field is added/renamed here, mirror it in `units.json` and
`src/Pages/RegistryPage.jsx`.

Naming a unit or picking its role/personality? See
[`LORE_COMPENDIUM.md`](./LORE_COMPENDIUM.md) — §2 for canon function
roles to base a `CLASS`/subsystem set on, §1 and §4 for
backstory-driven Legacy-Class inspiration.

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
STATUS:                 [ACTIVE / BUILDING / DAMAGED / CORRUPTED / DECOMMISSIONED / LOST / DESTROYED]
STATUS NOTES:           [circumstances, last known state]
LAST UPDATED:           [date]
```

Corresponding `units.json` shape (camelCase field names, same meanings):

```json
{
  "designation": "",
  "class": "FIRMWARE-CLASS",
  "personaLayer": "",
  "hardware": "",
  "gpioMapRef": "",
  "commChannel": "",
  "networkId": "",
  "firstDeployed": "",
  "status": "BUILDING",
  "statusNotes": "",
  "lastUpdated": ""
}
```
