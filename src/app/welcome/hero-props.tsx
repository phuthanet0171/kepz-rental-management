/**
 * ของตกแต่งส่วนบนหน้าแรก: ของจริงในโลกการปล่อยเช่า
 * ซ้าย = ป้าย "ว่าง ให้เช่า" แบบที่แขวนหน้าหอ/ร้าน, ขวา = พวงกุญแจห้องพร้อมป้ายรหัส
 * แกว่งเบาๆ ตลอด ชี้แล้วแกว่งแรงขึ้น (ปิดเมื่อผู้ใช้ตั้งลดการเคลื่อนไหว)
 */
export function RentSign({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="prop-swing h-full" style={{ ["--d" as string]: "0s" }}>
        <svg viewBox="0 0 220 230" className="h-full w-auto overflow-visible">
          {/* ตะปู + เชือกสองเส้น */}
          <circle cx="110" cy="8" r="5" fill="#1b1a17" />
          <path d="M110 8 L40 70 M110 8 L180 70" stroke="#1b1a17" strokeWidth="2.5" fill="none" />
          {/* ตัวป้าย */}
          <rect x="10" y="66" width="200" height="150" rx="10" fill="#fff" stroke="#1b1a17" strokeWidth="3" />
          <rect x="20" y="76" width="180" height="130" rx="6" fill="none" stroke="#d6283b" strokeWidth="4" />
          <circle cx="40" cy="70" r="5" fill="#fff" stroke="#1b1a17" strokeWidth="2.5" />
          <circle cx="180" cy="70" r="5" fill="#fff" stroke="#1b1a17" strokeWidth="2.5" />
          <text x="110" y="142" textAnchor="middle" fontSize="58" fontWeight="700" fill="#d6283b" className="font-sans">
            ว่าง
          </text>
          <text x="110" y="184" textAnchor="middle" fontSize="30" fontWeight="700" fill="#1b1a17" className="font-sans">
            ให้เช่า
          </text>
        </svg>
      </div>
    </div>
  );
}

const ITEMS: ({ kind: "tag"; code: string; tag: string; text: string } | { kind: "key" })[] = [
  { kind: "tag", code: "S-02", tag: "#ffffff", text: "#1b1a17" },
  { kind: "key" },
  { kind: "tag", code: "P-03", tag: "#1b1a17", text: "#ffd21f" },
  { kind: "tag", code: "4B", tag: "#22a05a", text: "#ffffff" },
];
const ANGLES = [36, 12, -12, -36];

export function KeyRing({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="prop-swing h-full" style={{ ["--d" as string]: "-1.7s" }}>
        <svg viewBox="30 0 160 230" className="h-full w-auto overflow-visible">
          <circle cx="110" cy="8" r="5" fill="#1b1a17" />
          <path d="M110 8 V30" stroke="#1b1a17" strokeWidth="2.5" />
          {/* แต่ละชิ้นห้อยจากห่วงเป็นรูปพัด ไม่ทับกัน */}
          {ITEMS.map((it, i) => (
            <g key={i} transform={`rotate(${ANGLES[i]} 110 52)`}>
              {it.kind === "tag" ? (
                <>
                  <path d="M110 74 V96" stroke="#1b1a17" strokeWidth="2" />
                  <rect x="86" y="96" width="48" height="70" rx="11" fill={it.tag} stroke="#1b1a17" strokeWidth="2.5" />
                  <circle cx="110" cy="108" r="4" fill="#ffd21f" stroke="#1b1a17" strokeWidth="2" />
                  <text x="110" y="143" textAnchor="middle" fontSize="16" fontWeight="700" fill={it.text} className="font-sans">
                    {it.code}
                  </text>
                </>
              ) : (
                <>
                  <circle cx="110" cy="86" r="13" fill="#d9b44a" stroke="#1b1a17" strokeWidth="2.5" />
                  <circle cx="110" cy="82" r="4" fill="#ffd21f" stroke="#1b1a17" strokeWidth="2" />
                  <path
                    d="M106 98 V156 l4 5 l4 -5 V150 h6 v-6 h-6 v-6 h7 v-6 h-7 V98"
                    fill="#d9b44a"
                    stroke="#1b1a17"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </>
              )}
            </g>
          ))}
          {/* ห่วงพวงกุญแจ วาดทับด้านบน */}
          <circle cx="110" cy="52" r="22" fill="none" stroke="#8d8a80" strokeWidth="5" />
        </svg>
      </div>
    </div>
  );
}
