# Servo-Skull Lore Compendium

Source material for the naming, behavior, and classification decisions
made elsewhere in this documentation. Compiled from a full-text pass
over the Black Library EPUB catalogue (53 titles containing at least
one "servo skull" / "servo-skull" mention, out of 423 surveyed —
audiobook/MOBI-only editions were out of scope for this pass).

Quotes below are short, individually attributed excerpts used for
illustration — not a substitute for the source novels. If a role or
detail here interests you, read the book it's cited from.

---

## 1. Named individuals are rare — canon mostly describes *roles*

Across the 53-book sample, almost no servo-skull is given a proper
name. The Adeptus Mechanicus and Inquisition treat them as
interchangeable tools; a tech-priest or inquisitor might have a dozen
in service at once, and the text tracks them collectively ("his
servo-skulls," "a trio of servo-skulls") rather than individually.

**The one clear exception:** *Father*, in Rob Sanders' **Atlas
Infernal**. Father is the personal familiar of Epiphani, a blind
warp-seer — and it is literally the skull of her own father,
Phalanghast, her former guide, mounted with blue bionic eyes that
serve as her actual eyes via a mind-link, a jaw that unspools vellum
message-scrolls instead of speaking, and a hidden cranial compartment
used to smuggle a stasis casket. Over the course of the novel it's
manhandled by a Thousand Sons sorcerer, nearly lost, and recovered —
treated by every character around Epiphani as something closer to a
companion than equipment.

> "The servo-skull was not only a guide for the blind warp-seer, it
> was her actual eyes."
> — Rob Sanders, *Atlas Infernal*

This is the model to reach for if you want a **Legacy-Class** unit
with a real personality/backstory hook (see `PROGRAMMING_REFERENCE.md`
§1) rather than a purely functional one — Father's whole premise is
that the "unit" *used to be someone*, and that fact still matters to
how it's treated.

---

## 2. Functional roles (what most servo-skulls actually are)

Everything else in the corpus sorts cleanly into a handful of
functions, each attested by multiple authors independently — this is
the closest thing to a "spec" canon gives, and it's what
`PROGRAMMING_REFERENCE.md` §3's subsystem table is grounded in.

| Role | Attributes / function in-text | Sourced from |
|---|---|---|
| **Pict-recorder / archivist** | Eye-socket pict-imagers; records events, sermons, trials, battles "for posterity" or for closed Inquisition archives | *Rogue Star* (Andy Hoare), *Faith and Fire* (James Swallow), *Rebel Winter* (Steve Parker), *Duty Calls* (Sandy Mitchell) |
| **Vox-relay / proclamation** | Jaw replaced by a vox-speaker; amplifies and broadcasts a speaker's words to a crowd | *Rogue Star* (Andy Hoare), *First Heretic* (Aaron Dembski-Bowden) |
| **Censer-bearer / ritual** | Carries a candle or incense censer in council chambers or liturgical processions | *Savage Scars* (Andy Hoare), *Architect of Fate* (Christian Dunn), *Shadow Point* (Gordon Rennie) |
| **Scribe / transcription** | Quill held in bronze callipers; unspools vellum/parchment; takes dictation | *Helsreach* (Aaron Dembski-Bowden), *Courage and Honour* (Graham McNeill), *Atlas Infernal* (Rob Sanders — Father) |
| **Guardian / armed patrol** | Mounted las-weapons or dart launchers; fires on detected threats; patrols ductways and approach corridors | *Faith and Fire* (James Swallow), *Fire Warrior* (Simon Spurrier) |
| **Inquisitorial retinue** | Orbits an inquisitor as a badge of office and a constant surveillance/recording presence | *Talon of Horus* (Aaron Dembski-Bowden), *Deus Sanguinius* / *Deus Encarmine* (James Swallow), *Ravenor Omnibus* (Dan Abnett), *Innocence Proves Nothing* (Sandy Mitchell) |
| **Medicae / field-surgical** | Extends a cauterising blade; disconnects psychic-hood leads and other implant maintenance | *Fateweaver* (John French) |
| **Guide / sensory prosthetic** | Serves as the literal eyes (or other senses) of an operator who lacks them, via mind-link | *Atlas Infernal* (Rob Sanders) — Father |

A single unit is often multi-role in the text (Father is
scribe+guide; an inquisitor's retinue skull is recorder+guardian) —
treat the table as a menu of composable subsystems, which is exactly
how `PROGRAMMING_REFERENCE.md` §3 uses it.

> "The actual skulls of the most favoured of the Imperium's
> servants... implanted with all manner of machine devices, in order
> for the previous owner to go on serving his master long after his
> passing."
> — Andy Hoare, *Rogue Star*

> "Servo-skull picter, as standard. House will supply eight. You'll
> each be allowed two of your own."
> — Dan Abnett, *Ravenor Omnibus*

> "I'll thank you to stop breaking my servo-skulls."
> — Aaron Dembski-Bowden, *Talon of Horus*

---

## 3. Status, as canon actually shows it

There's no formal "status register" in-universe, but the text is
consistent about how a unit's operational state changes, which maps
directly onto `REGISTRATION_TRACKING.md`'s `STATUS` field:

- **ACTIVE** — the default state for most servo-skulls in-text:
  hovering, recording, orbiting a master.
- **DESTROYED** — shown on-page multiple times: shot down by
  hostiles (*Faith and Fire*), crushed against a bulkhead by
  turbulence (*Planetkill*, Nick Kyme), frozen solid and shattered
  (*Savage Scars*), cut in half by an energy blade (*Xenos Hunters*,
  C. Z. Dunn).
- **DAMAGED / MALFUNCTIONING** — a servo-skull with a burnt-out
  anti-grav motor is still carried by hand rather than scrapped
  (*Annihilation Squad*, Gav Thorpe) — precedent for a
  "damaged but retained" status short of DECOMMISSIONED.
- **LOST** — Father is briefly lost/untracked mid-crisis in *Atlas
  Infernal* before being recovered — precedent for a transient LOST
  state distinct from DESTROYED.

---

## 4. A deliberate non-user: the Ultramarines

Not every Chapter or organization uses servo-skulls, and the text is
explicit about why — worth keeping in mind for the classification
ethics angle in `PROGRAMMING_REFERENCE.md` §1.

> "The Ultramarines shunned the use of servo-skulls, preferring that
> the mortal remains of fallen Imperial servants be interred whole
> that they might sit at the right hand of the Emperor complete."
> — Graham McNeill, *Warriors of Ultramar*

The Mortifactors go the opposite direction — deliberately morbid,
mounting a *battle-brother's* own skull on one of their units
(*Xenos Hunters*, C. Z. Dunn) — which is closer in spirit to Father
than to the anonymous-recorder default.

---

## 5. Using this in the register

When you name a real unit in `REGISTRATION_TRACKING.md`, pick from
§2's role table for its function set, and use §1/§4 as inspiration if
you want a Legacy-Class unit with backstory weight rather than a
purely functional Firmware-Class recorder/guardian.
