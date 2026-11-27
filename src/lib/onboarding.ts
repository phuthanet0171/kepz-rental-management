/**
 * ข้อมูลตั้งต้นกิจการ (ขั้นตอนเริ่มใช้งาน)
 * ตอนนี้เป็นต้นแบบหน้าเว็บ: เก็บร่างไว้ในเครื่อง (localStorage) ยังไม่บันทึกลงฐานข้อมูล
 */

export type Period = "month" | "day" | "hour";

export type BusinessType = "storage" | "dorm" | "parking" | "market" | "vehicle" | "equipment" | "other";

export type RentalGroup = {
  id: string;
  name: string;
  /** อักษรหน้ารหัส เช่น S → S-01, S-02 */
  prefix: string;
  count: number;
  price: number;
  period: Period;
  size: string;
};

export type Draft = {
  step: number;
  owner: { name: string; email: string };
  business: { name: string; types: BusinessType[]; phone: string };
  branch: { name: string; address: string };
  groups: RentalGroup[];
  billing: {
    /** "start" = ตามวันเริ่มสัญญาของแต่ละคน, ตัวเลข = ทุกวันที่นั้นของเดือน */
    billDay: "start" | number;
    dueDays: number;
    depositMonths: number;
    promptpay: string;
    bank: string;
    bankAccount: string;
    taxId: string;
  };
  updatedAt: number;
};

export const PERIOD_LABEL: Record<Period, string> = { month: "ต่อเดือน", day: "ต่อวัน", hour: "ต่อชั่วโมง" };

export const BUSINESS_TYPES: { key: BusinessType; label: string; hint: string }[] = [
  { key: "storage", label: "ห้องเก็บของ", hint: "มินิสโตเรจ โกดัง" },
  { key: "dorm", label: "หอพัก ห้องเช่า", hint: "อพาร์ตเมนต์ บ้านเช่า" },
  { key: "parking", label: "ที่จอดรถ", hint: "รายเดือน รายวัน" },
  { key: "market", label: "แผงตลาด", hint: "พื้นที่ขายของ บูธ" },
  { key: "vehicle", label: "รถเช่า", hint: "รถยนต์ มอเตอร์ไซค์ จักรยาน" },
  { key: "equipment", label: "ชุดและอุปกรณ์", hint: "ชุด กล้อง เต็นท์ โต๊ะ" },
  { key: "other", label: "อย่างอื่น", hint: "ตั้งชื่อเองได้" },
];

/** ของให้เช่าที่แนะนำตามประเภทกิจการ (ผู้ใช้แก้ได้ทั้งหมด) */
const PRESET: Record<BusinessType, Omit<RentalGroup, "id">[]> = {
  storage: [
    { name: "ห้องเก็บของเล็ก", prefix: "S", count: 10, price: 1600, period: "month", size: "1.5 × 1 ม." },
    { name: "ห้องเก็บของกลาง", prefix: "M", count: 6, price: 2500, period: "month", size: "2 × 2 ม." },
  ],
  dorm: [
    { name: "ห้องพัดลม", prefix: "A", count: 8, price: 3000, period: "month", size: "" },
    { name: "ห้องแอร์", prefix: "B", count: 8, price: 4500, period: "month", size: "" },
  ],
  parking: [{ name: "ที่จอดรถยนต์", prefix: "P", count: 12, price: 990, period: "month", size: "" }],
  market: [{ name: "แผงขายของ", prefix: "K", count: 20, price: 250, period: "day", size: "2 × 2 ม." }],
  vehicle: [{ name: "รถยนต์", prefix: "CAR", count: 3, price: 1200, period: "day", size: "" }],
  equipment: [{ name: "อุปกรณ์ให้เช่า", prefix: "E", count: 10, price: 300, period: "day", size: "" }],
  other: [{ name: "ของให้เช่า", prefix: "R", count: 5, price: 1000, period: "month", size: "" }],
};

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function presetGroups(types: BusinessType[]): RentalGroup[] {
  const list = (types.length ? types : (["other"] as BusinessType[])).flatMap((t) => PRESET[t]);
  return list.map((g) => ({ ...g, id: uid() }));
}

export function unitCodes(g: RentalGroup, limit = Infinity) {
  const n = Math.min(g.count, limit);
  const width = Math.max(2, String(g.count).length);
  return Array.from({ length: n }, (_, i) => `${g.prefix || "?"}-${String(i + 1).padStart(width, "0")}`);
}

export function emptyDraft(): Draft {
  return {
    step: 0,
    owner: { name: "", email: "" },
    business: { name: "", types: [], phone: "" },
    branch: { name: "สาขาหลัก", address: "" },
    groups: [],
    billing: { billDay: 1, dueDays: 5, depositMonths: 1, promptpay: "", bank: "", bankAccount: "", taxId: "" },
    updatedAt: 0,
  };
}

const KEY = "kepz:onboarding";

export function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return { ...emptyDraft(), ...(JSON.parse(raw) as Draft) };
  } catch {
    return null;
  }
}

export function saveDraft(d: Draft) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...d, updatedAt: Date.now() }));
  } catch {
    /* เก็บร่างไม่ได้ (โหมดส่วนตัว) ก็ยังใช้งานต่อได้ */
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ไม่เป็นไร */
  }
}

export function money(n: number) {
  return n.toLocaleString("th-TH", { maximumFractionDigits: 0 });
}
