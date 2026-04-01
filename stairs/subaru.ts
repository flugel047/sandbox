import { prepareWithSegments, layoutNextLine, type LayoutCursor } from '@chenglou/pretext';

const TEXT = `On the night of the second day since Subaru had been thrown into the Pleiades Watchtower, he climbed the stairs. The tower had no elevator, no mercy. Each floor was a repetition of stone and silence. Beatrice walked beside him, her twin drills bouncing with each step, her small hand gripping his with a force that betrayed her calm expression. "I suppose, in fact, that we have no choice but to keep climbing," she said. "Yeah." Subaru exhaled. "That's kind of the whole thing with stairs, Betty." He had died seven times on this staircase. Or maybe it was eight. The tower had a way of making him forget the exact count, which he suspected was intentional. Somewhere above them, Echidna waited — not the witch he had known, but a version of her wearing the name Omega like a borrowed coat. The walls were covered in text he could not read. Ancient script, Beatrice said. Records of everyone who had ever climbed this far and failed. Subaru tried not to think about how much wall space remained above them. "You're making that face again," Beatrice said. "What face?" "The one where you're counting deaths instead of steps, I suppose." He didn't answer. The staircase wound upward, patient and indifferent, and Natsuki Subaru climbed it the only way he knew how — one step at a time, with someone's hand in his, toward a floor he hadn't reached yet. The tower had no elevator, no mercy. Each floor was a repetition of stone and silence. He had died eight times. Or maybe nine. The count blurred after a while. What mattered was that he kept moving. Up. Always up. Past floors that smelled of old rain and forgotten names. Past doors that opened onto nothing. He climbed because stopping meant admitting the tower had won. And Natsuki Subaru did not let towers win. Not today. Not on this loop. Not ever.`;

const PAGE_W = 960;
const PAGE_H = 700;
const FONT_SIZE = 13;
const LINE_H = 24;
const FONT_STR = `${FONT_SIZE}px/1 "Courier New", monospace`;

// ─── Sprite dimensions ────────────────────────────────────────────────────────
// Original PNG: 822×828 px. Scale to fit comfortably in the 700px-tall stage.
const SIL_SCALE = 0.55;
const SIL_W = Math.round(822 * SIL_SCALE); // 452
const SIL_H = Math.round(828 * SIL_SCALE); // 455

// ─── Per-line silhouette bands ────────────────────────────────────────────────
// Each entry: [leftEdge, rightEdge] relative to spriteX, in sprite-local px.
// null = line is fully clear (above or below the figure).
// Derived from the PNG: Subaru is running right, cape flaring left/back,
// right arm thrust forward. Widest at torso+cape rows.
//
// Horizontal fractions of SIL_W (452px):
//   Head:          centred, roughly [0.37, 0.62]
//   Shoulders/arm: [0.08, 0.84]  (right fist punches far right)
//   Torso+cape:    [0.02, 0.90]  (cape billows left)
//   Hips:          [0.22, 0.68]
//   Thighs:        [0.25, 0.62]
//   Shins/feet:    [0.30, 0.55]

function buildBands(): ([number, number] | null)[] {
  // [leftFrac, rightFrac] per LINE_H row, from top of sprite rect
  const profile: [number, number][] = [
    [0.37, 0.62], // row 0  — top of head
    [0.35, 0.63], // row 1
    [0.33, 0.62], // row 2
    [0.30, 0.61], // row 3  — neck
    [0.08, 0.84], // row 4  — shoulders + forward arm
    [0.06, 0.86], // row 5
    [0.03, 0.90], // row 6  — chest + cape starts
    [0.02, 0.92], // row 7
    [0.02, 0.92], // row 8
    [0.02, 0.90], // row 9
    [0.03, 0.88], // row 10
    [0.04, 0.86], // row 11
    [0.05, 0.84], // row 12
    [0.07, 0.82], // row 13
    [0.09, 0.78], // row 14
    [0.18, 0.72], // row 15 — hips
    [0.22, 0.68], // row 16
    [0.25, 0.64], // row 17 — thighs
    [0.27, 0.60], // row 18
    [0.28, 0.56], // row 19
    [0.29, 0.53], // row 20 — shins
    [0.30, 0.54], // row 21
    [0.31, 0.55], // row 22
    [0.32, 0.54], // row 23 — feet
    [0.33, 0.52], // row 24
  ];

  const numLines = Math.ceil(SIL_H / LINE_H);
  const bands: ([number, number] | null)[] = [];
  for (let i = 0; i < numLines; i++) {
    const p = profile[i] ?? profile[profile.length - 1];
    bands.push([Math.round(p[0] * SIL_W), Math.round(p[1] * SIL_W)]);
  }
  return bands;
}

const SIL_BANDS = buildBands();

// ─── Walk-cycle animation ─────────────────────────────────────────────────────
// Subtle bob + lean to make the static PNG feel alive
const WALK_FRAMES = [
  { bobY: 0,   lean: 0,    scaleY: 1.00 },
  { bobY: -5,  lean: 1.5,  scaleY: 1.01 },
  { bobY: -9,  lean: 2.5,  scaleY: 1.02 },
  { bobY: -5,  lean: 1.0,  scaleY: 1.00 },
  { bobY: 0,   lean: -1.0, scaleY: 0.99 },
  { bobY: -3,  lean: -1.5, scaleY: 1.00 },
];
const FRAME_DURATION = 110; // ms per frame

// ─── State ────────────────────────────────────────────────────────────────────
const WALK_SPEED = 80;            // px/sec
const STEP_SIZE  = LINE_H * 2;   // px to drop per stair step

let spriteX = Math.round((PAGE_W - SIL_W) / 2);
let spriteY = PAGE_H - SIL_H;
let dirX: 1 | -1 = 1;
let lastTime = 0;
let elapsed  = 0;

let outputEl: HTMLDivElement;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let subaruImg: HTMLImageElement;
let imgLoaded = false;
let prepared: ReturnType<typeof prepareWithSegments>;

// ─── DOM setup ────────────────────────────────────────────────────────────────
function initDOM() {
  document.body.style.cssText = `
    margin:0; padding:20px 0;
    background:#080810;
    display:flex; justify-content:center;
    min-height:100vh; box-sizing:border-box;
  `;

  const container = document.createElement('div');
  container.style.cssText = `
    position:relative;
    width:${PAGE_W}px; height:${PAGE_H}px;
    overflow:hidden; flex-shrink:0;
  `;

  outputEl = document.createElement('div');
  outputEl.style.cssText = `
    position:absolute; top:0; left:0;
    width:${PAGE_W}px; height:${PAGE_H}px;
  `;

  canvas = document.createElement('canvas');
  canvas.width  = PAGE_W;
  canvas.height = PAGE_H;
  canvas.style.cssText = `position:absolute; top:0; left:0; pointer-events:none;`;
  ctx = canvas.getContext('2d')!;

  container.appendChild(outputEl);
  container.appendChild(canvas);
  document.body.appendChild(container);

  subaruImg = new Image();
  subaruImg.onload  = () => { imgLoaded = true; };
  subaruImg.onerror = () => {
    console.warn('[subaru] Could not load subaru_transparent.png — make sure it is in the same folder as subaru.html');
  };
  subaruImg.src = './subaru_transparent.png';
}

// ─── Canvas sprite draw ───────────────────────────────────────────────────────
function drawSprite() {
  ctx.clearRect(0, 0, PAGE_W, PAGE_H);
  if (!imgLoaded) return;

  const fi    = Math.floor(elapsed / FRAME_DURATION) % WALK_FRAMES.length;
  const frame = WALK_FRAMES[fi];

  const cx = spriteX + SIL_W / 2;
  const cy = spriteY + SIL_H / 2;

  ctx.save();
  ctx.translate(cx, cy + frame.bobY);
  if (dirX === -1) ctx.scale(-1, 1);  // mirror when walking left
  ctx.rotate((frame.lean * dirX * Math.PI) / 180);
  ctx.scale(1, frame.scaleY);
  ctx.drawImage(subaruImg, -SIL_W / 2, -SIL_H / 2, SIL_W, SIL_H);
  ctx.restore();
}

// ─── Line div helper ──────────────────────────────────────────────────────────
function placeDiv(text: string, x: number, y: number, w: number) {
  const div = document.createElement('div');
  div.style.cssText = `
    position:absolute; left:${x}px; top:${y}px;
    width:${w}px;
    font-size:${FONT_SIZE}px; line-height:${LINE_H}px;
    font-family:"Courier New",monospace;
    color:#cfc4b0; white-space:pre; overflow:hidden;
  `;
  div.textContent = text;
  outputEl.appendChild(div);
}

// ─── Layout (called every frame) ─────────────────────────────────────────────
function layout() {
  outputEl.innerHTML = '';

  const numLines = Math.ceil(PAGE_H / LINE_H);
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

  for (let line = 0; line < numLines; line++) {
    const pageY     = line * LINE_H;
    const bandIndex = Math.floor((pageY - spriteY) / LINE_H);
    const inSprite  = bandIndex >= 0 && bandIndex < SIL_BANDS.length;
    const sil       = inSprite ? SIL_BANDS[bandIndex] : null;

    if (!sil) {
      // ── Full-width line ─────────────────────────────────────────────────
      const r = layoutNextLine(prepared, cursor, PAGE_W);
      if (!r) { cursor = { segmentIndex: 0, graphemeIndex: 0 }; continue; }
      placeDiv(r.line.text, 0, pageY, PAGE_W);      // ← r.line.text, r.nextCursor
      cursor = r.nextCursor;
    } else {
      // ── Split around silhouette ─────────────────────────────────────────
      const absLeft  = Math.max(0, spriteX + sil[0]);
      const absRight = Math.min(PAGE_W, spriteX + sil[1]);
      const leftW    = absLeft - 4;
      const rightX   = absRight + 4;
      const rightW   = PAGE_W - rightX;

      if (leftW > 50) {
        const r = layoutNextLine(prepared, cursor, leftW);
        if (r) { placeDiv(r.line.text, 0, pageY, leftW); cursor = r.nextCursor; }
      }
      if (rightW > 50) {
        const r = layoutNextLine(prepared, cursor, rightW);
        if (r) { placeDiv(r.line.text, rightX, pageY, rightW); cursor = r.nextCursor; }
      }
      // Both sides too narrow — consume a token to keep cursor advancing
      if (leftW <= 50 && rightW <= 50) {
        const r = layoutNextLine(prepared, cursor, 20);
        if (r) cursor = r.nextCursor;
      }
    }
  }
}

// ─── Sprite movement (staircase pattern) ─────────────────────────────────────
function updateSprite(dt: number) {
  elapsed += dt * 1000;
  spriteX += dirX * WALK_SPEED * dt;

  if (spriteX >= PAGE_W - SIL_W) {
    spriteX = PAGE_W - SIL_W;
    dirX    = -1;
    spriteY -= STEP_SIZE;          // stair: drop down on right bounce
  } else if (spriteX <= 0) {
    spriteX = 0;
    dirX    = 1;
    spriteY -= STEP_SIZE;          // stair: drop down on left bounce
  }

  // Wrap back to bottom when he's walked off the top
  if (spriteY + SIL_H < 0) spriteY = PAGE_H + 10;
}

// ─── Main loop ────────────────────────────────────────────────────────────────
function animate(ts: number) {
  const dt = Math.min((ts - lastTime) / 1000, 0.05);
  lastTime = ts;
  updateSprite(dt);
  layout();
  drawSprite();
  requestAnimationFrame(animate);
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
initDOM();
prepared = prepareWithSegments(TEXT, FONT_STR);
requestAnimationFrame((ts) => { lastTime = ts; requestAnimationFrame(animate); });
