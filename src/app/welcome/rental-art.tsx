/**
 * ภาพตัวอย่างของให้เช่า (วาดเป็น SVG ให้เข้ากับแบรนด์ ไม่ต้องโหลดรูป)
 * ถ้ามีรูปถ่ายจริงภายหลัง เปลี่ยนเป็น <Image> ได้ทีละรายการ
 */
export type ArtKey =
  | "storage"
  | "stall"
  | "car"
  | "parking"
  | "dress"
  | "tent"
  | "camera"
  | "dorm"
  | "warehouse"
  | "bike"
  | "table"
  | "meeting";

const BG: Record<ArtKey, string> = {
  storage: "#ffe9a3",
  stall: "#ffd9c7",
  car: "#cfe3ff",
  parking: "#e3e7ee",
  dress: "#ffd6df",
  tent: "#d8f0e1",
  camera: "#e8e1f7",
  dorm: "#ffe3c2",
  warehouse: "#e9e5da",
  bike: "#d4eff4",
  table: "#fff0cf",
  meeting: "#e1e8ff",
};

const INK = "#1b1a17";

export function RentalArt({ art, className }: { art: ArtKey; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="14" fill={BG[art]} />
      {ART[art]}
    </svg>
  );
}

const ART: Record<ArtKey, React.ReactNode> = {
  /* ห้องเก็บของ: ประตูม้วน */
  storage: (
    <g>
      <rect x="12" y="14" width="40" height="38" rx="3" fill={INK} />
      <rect x="16" y="19" width="32" height="33" fill="#d9d6cc" />
      {[23, 28, 33, 38, 43].map((y) => (
        <rect key={y} x="16" y={y} width="32" height="1.6" fill="#b5b1a5" />
      ))}
      <rect x="28" y="46" width="8" height="2.5" rx="1.2" fill={INK} />
      <rect x="22" y="9" width="20" height="6" rx="2" fill="#ffd21f" stroke={INK} strokeWidth="1.5" />
    </g>
  ),
  /* แผงตลาด: กันสาดลายทาง + ผลไม้ */
  stall: (
    <g>
      <rect x="14" y="26" width="2.5" height="26" fill={INK} />
      <rect x="47.5" y="26" width="2.5" height="26" fill={INK} />
      <path d="M10 14h44l-3 12H13z" fill="#fff" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      {[13, 24, 35, 46].map((x) => (
        <path key={x} d={`M${x} 14h5.5l-0.8 12h-5.4z`} fill="#e5483b" />
      ))}
      <rect x="12" y="40" width="40" height="7" rx="1.5" fill="#c98b4e" stroke={INK} strokeWidth="1.5" />
      <circle cx="21" cy="37" r="4" fill="#f59e0b" />
      <circle cx="30" cy="36.5" r="4.5" fill="#22a05a" />
      <circle cx="40" cy="37" r="4" fill="#e5483b" />
    </g>
  ),
  /* รถยนต์ */
  car: (
    <g>
      <path d="M10 40c0-4 2-6 6-6l6-8h18l8 8c4 0 6 2 6 6v5H10z" fill="#e5483b" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 28h7v6H20zM34 28h6l5 6H34z" fill="#bfe1ff" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="20" cy="45" r="5.5" fill={INK} />
      <circle cx="20" cy="45" r="2" fill="#d9d6cc" />
      <circle cx="44" cy="45" r="5.5" fill={INK} />
      <circle cx="44" cy="45" r="2" fill="#d9d6cc" />
      <rect x="49" y="37" width="4" height="2.5" rx="1" fill="#ffd21f" />
    </g>
  ),
  /* ที่จอดรถ: ป้าย P */
  parking: (
    <g>
      <rect x="6" y="44" width="52" height="12" fill="#9aa3b2" />
      <rect x="14" y="48" width="9" height="2" fill="#fff" />
      <rect x="30" y="48" width="9" height="2" fill="#fff" />
      <rect x="30.5" y="22" width="3" height="24" fill={INK} />
      <rect x="20" y="8" width="24" height="18" rx="4" fill="#2563eb" stroke={INK} strokeWidth="1.5" />
      <path d="M28 12v10M28 12h5a3.2 3.2 0 0 1 0 6.4h-5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  /* ชุดราตรีบนไม้แขวน */
  dress: (
    <g>
      <path d="M32 8a3 3 0 1 1 3 3c-1.5 0-3 1-3 2.5" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 20l14-6 14 6" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 18l5 4 5-4 2 12 9 22H16l9-22z" fill="#d6283b" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M25 30h14" stroke="#ffd21f" strokeWidth="2" />
    </g>
  ),
  /* เต็นท์ */
  tent: (
    <g>
      <rect x="6" y="48" width="52" height="4" rx="2" fill="#7cb98f" />
      <path d="M32 12L8 48h48z" fill="#fff" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M32 12l-8 36M32 12l8 36" stroke="#22a05a" strokeWidth="3" />
      <path d="M32 30l-5 18h10z" fill={INK} />
      <path d="M32 12V7" stroke={INK} strokeWidth="1.5" />
      <path d="M32 7l6 2.5-6 2.5z" fill="#e5483b" />
    </g>
  ),
  /* กล้อง */
  camera: (
    <g>
      <rect x="10" y="20" width="44" height="30" rx="5" fill={INK} />
      <rect x="18" y="15" width="12" height="7" rx="2" fill={INK} />
      <circle cx="34" cy="35" r="11" fill="#3a3a3a" stroke="#d9d6cc" strokeWidth="2" />
      <circle cx="34" cy="35" r="6" fill="#4b6cb7" />
      <circle cx="31.5" cy="32.5" r="1.8" fill="#fff" />
      <rect x="45" y="24" width="5" height="3" rx="1" fill="#ffd21f" />
    </g>
  ),
  /* ห้องเช่า/อพาร์ตเมนต์ */
  dorm: (
    <g>
      <rect x="14" y="12" width="36" height="42" rx="2" fill="#f2a65a" stroke={INK} strokeWidth="1.5" />
      {[18, 28, 38].map((y) =>
        [19, 29, 39].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1" fill={x === 39 && y === 18 ? "#ffd21f" : "#fff6e0"} stroke={INK} strokeWidth="1" />
        )),
      )}
      <rect x="28" y="46" width="8" height="8" fill={INK} />
    </g>
  ),
  /* โกดัง */
  warehouse: (
    <g>
      <path d="M8 26L32 12l24 14v28H8z" fill="#b8b2a1" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="18" y="32" width="28" height="22" fill="#ece9df" stroke={INK} strokeWidth="1.5" />
      {[37, 42, 47].map((y) => (
        <rect key={y} x="18" y={y} width="28" height="1.4" fill="#b8b2a1" />
      ))}
      <circle cx="32" cy="24" r="3" fill="#ffd21f" stroke={INK} strokeWidth="1.2" />
    </g>
  ),
  /* จักรยาน */
  bike: (
    <g fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="40" r="9" />
      <circle cx="46" cy="40" r="9" />
      <path d="M18 40l9-14h13l6 14M27 26l7 14h-16M38 22h6" stroke="#0e8aa0" />
      <path d="M24 22h7" />
    </g>
  ),
  /* โต๊ะจัดเลี้ยง */
  table: (
    <g>
      <ellipse cx="32" cy="28" rx="22" ry="8" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <path d="M10 28v12c0 4 10 8 22 8s22-4 22-8V28" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <path d="M10 36c6 4 38 4 44 0" fill="none" stroke="#ffd21f" strokeWidth="2.5" />
      <circle cx="32" cy="26" r="3.5" fill="#e5483b" />
      <path d="M32 22.5v-4" stroke="#22a05a" strokeWidth="2" />
    </g>
  ),
  /* ห้องประชุม */
  meeting: (
    <g>
      <rect x="10" y="12" width="44" height="18" rx="2" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <path d="M16 25l7-6 5 4 8-7 8 5" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
      <rect x="12" y="38" width="40" height="5" rx="2" fill="#c98b4e" stroke={INK} strokeWidth="1.5" />
      <rect x="16" y="43" width="3" height="10" fill={INK} />
      <rect x="45" y="43" width="3" height="10" fill={INK} />
      {[20, 30, 40].map((x) => (
        <rect key={x} x={x} y="32" width="6" height="6" rx="2" fill="#4b6cb7" />
      ))}
    </g>
  ),
};
