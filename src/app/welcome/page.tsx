import clsx from "clsx";
import {
  ArrowRight,
  BellRing,
  Bike,
  Camera,
  Car,
  Check,
  FileText,
  LayoutGrid,
  ParkingSquare,
  PiggyBank,
  ReceiptText,
  Shirt,
  Smartphone,
  Store,
  Tent,
  Users,
  Warehouse,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Kepz — มีอะไรให้เช่า ก็จัดการได้บน Kepz" },
  description: "ระบบจัดการธุรกิจให้เช่า ห้อง ที่จอด แผงตลาด รถ ชุด อุปกรณ์ ทำสัญญา ออกบิล รับเงิน ครบในที่เดียว ใช้บนมือถือได้",
};

/** หน้าแรกสำหรับคนทั่วไป (ยังไม่ได้เข้าสู่ระบบ): ชวนมาใช้งาน */
export default function WelcomePage() {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <TopBar />
      <Hero />
      <RentAnything />
      <HowItWorks />
      <Features />
      <FinalCta />
      <footer className="px-5 py-8 text-center text-sm text-muted">
        <span className="font-bold text-ink">
          kepz<span className="text-brand-strong">.</span>
        </span>{" "}
        · มีอะไรให้เช่า ก็จัดการได้บน Kepz
      </footer>
    </div>
  );
}

function Logo({ dark }: { dark?: boolean }) {
  return (
    <span className={clsx("text-2xl font-bold tracking-tight", dark ? "text-white" : "text-ink")}>
      kepz<span className="text-brand">.</span>
    </span>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-30 bg-ink/95 backdrop-blur" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/welcome" aria-label="Kepz หน้าแรก">
          <Logo dark />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-white/70 md:flex">
          <a href="#rent" className="hover:text-white">
            ให้เช่าอะไรได้บ้าง
          </a>
          <a href="#how" className="hover:text-white">
            วิธีใช้งาน
          </a>
          <a href="#features" className="hover:text-white">
            ฟีเจอร์
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:text-white max-sm:hidden">
            เข้าสู่ระบบ
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink transition hover:bg-brand-strong active:scale-95"
          >
            เริ่มใช้งาน
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden bg-ink text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-16 lg:grid-cols-[1.1fr_1fr] lg:pt-20 lg:pb-24">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
            <span className="size-1.5 rounded-full bg-brand" /> ระบบจัดการธุรกิจให้เช่า
          </span>
          <h1 className="mt-5 text-[2.6rem] leading-[1.2] font-bold tracking-tight sm:text-6xl sm:leading-[1.15]">
            มีอะไรให้เช่า
            <br />
            ก็จัดการได้บน <span className="text-brand">Kepz.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/65 sm:text-lg lg:mx-0">
            <Phrases text="ห้อง ที่จอด แผงตลาด รถ ชุด หรืออุปกรณ์ ทำสัญญา ออกบิล รับเงิน และดูว่าอะไรว่าง ครบในที่เดียว ใช้บนมือถือได้ทุกที่" />
          </p>
          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/login"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand px-7 text-base font-semibold text-ink transition hover:bg-brand-strong active:scale-[0.98]"
            >
              เริ่มใช้งาน <ArrowRight className="size-4" />
            </Link>
            <a
              href="#how"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/25 px-7 text-base font-medium text-white transition hover:bg-white/10"
            >
              ดูวิธีใช้งาน
            </a>
          </div>
        </div>
        <PhoneMock />
      </div>
    </section>
  );
}

/** ตัวอย่างหน้าจอแอป (วาดด้วย HTML ไม่ใช้รูป) */
function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      {/* ป้ายลอยรอบโทรศัพท์ */}
      <FloatChip className="-top-4 -left-6 max-sm:left-0" icon={<Check className="size-3.5" />} tone="ok">
        รับชำระแล้ว +฿1,600
      </FloatChip>
      <FloatChip className="-right-10 bottom-20 max-sm:right-0 max-sm:-bottom-4" icon={<FileText className="size-3.5" />}>
        สัญญาใหม่ · S-02
      </FloatChip>

      <div className="rounded-[2.6rem] border-[7px] border-white/90 bg-canvas p-3 text-ink shadow-2xl">
        <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-ink" />
        <div className="rounded-2xl bg-ink p-4 text-white">
          <div className="text-[11px] text-white/60">รายรับเดือนนี้</div>
          <div className="text-2xl font-bold">฿10,300</div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            <div className="rounded-xl bg-brand px-2.5 py-1.5 text-ink">
              <div className="text-[10px] text-ink/70">ค่าเช่า</div>
              <div className="text-sm font-bold">฿5,700</div>
            </div>
            <div className="rounded-xl bg-white/10 px-2.5 py-1.5">
              <div className="text-[10px] text-white/60">เงินประกัน</div>
              <div className="text-sm font-bold">฿4,600</div>
            </div>
          </div>
          <div className="mt-3 flex h-12 items-end gap-1.5">
            {[30, 45, 38, 60, 72, 100].map((h, i) => (
              <span key={i} className={clsx("flex-1 rounded-t", i === 5 ? "bg-brand" : "bg-white/20")} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {[
            ["A1", "ok"],
            ["A2", "ink"],
            ["A3", "ink"],
            ["A4", "ok"],
            ["B1", "ink"],
            ["B2", "warn"],
            ["B3", "ok"],
            ["B4", "ink"],
          ].map(([c, t]) => (
            <span
              key={c}
              className={clsx(
                "grid h-10 place-items-center rounded-lg border-2 text-[11px] font-bold",
                t === "ok" && "border-ok bg-ok-soft text-ok",
                t === "ink" && "border-ink bg-ink text-white",
                t === "warn" && "border-brand-strong bg-brand text-ink",
              )}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white p-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-bad-soft text-bad">
            <BellRing className="size-4" />
          </span>
          <div className="min-w-0 flex-1 text-[11px] leading-tight">
            <div className="font-semibold">ค้างชำระ 2 รายการ</div>
            <div className="text-muted">แตะเพื่อดูและส่งบิล</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatChip({
  className,
  icon,
  tone,
  children,
}: {
  className?: string;
  icon: ReactNode;
  tone?: "ok";
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "absolute z-10 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-ink shadow-lg",
        className,
      )}
    >
      <span className={clsx("grid size-5 place-items-center rounded-full", tone === "ok" ? "bg-ok text-white" : "bg-brand text-ink")}>
        {icon}
      </span>
      {children}
    </div>
  );
}

const RENTABLES: { label: string; icon: typeof Warehouse; cls: string }[] = [
  { label: "ห้องเก็บของ", icon: Warehouse, cls: "bg-brand text-ink" },
  { label: "ที่จอดรถ", icon: ParkingSquare, cls: "bg-ink text-brand" },
  { label: "แผงตลาด", icon: Store, cls: "bg-white text-ink" },
  { label: "รถเช่า", icon: Car, cls: "bg-[#ffe98a] text-ink" },
  { label: "ชุด / เสื้อผ้า", icon: Shirt, cls: "bg-white text-ink" },
  { label: "กล้อง / อุปกรณ์", icon: Camera, cls: "bg-ink text-white" },
  { label: "เต็นท์ / ของจัดงาน", icon: Tent, cls: "bg-brand text-ink" },
  { label: "จักรยาน / กีฬา", icon: Bike, cls: "bg-[#ffe98a] text-ink" },
];

function RentAnything() {
  return (
    <section id="rent" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
      <SectionTitle kicker="ให้เช่าอะไรได้บ้าง" title="ไม่ว่าจะเช่าอะไร ก็ใช้ระบบเดียว" />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {RENTABLES.map(({ label, icon: Icon, cls }) => (
          <div
            key={label}
            className={clsx(
              "flex aspect-[4/3] flex-col justify-between rounded-3xl p-4 ring-1 ring-ink/5 transition hover:-translate-y-1 sm:p-5",
              cls,
            )}
          >
            <Icon className="size-8 sm:size-10" strokeWidth={1.6} />
            <span className="text-sm font-semibold sm:text-base">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-sm text-muted">และธุรกิจให้เช่าแบบอื่น ๆ ตั้งค่าเองได้</p>
    </section>
  );
}

const STEPS = [
  { title: "เพิ่มสิ่งที่ให้เช่า", desc: "วาดผังพื้นที่ หรือเพิ่มของทีละชิ้น ตั้งราคาครั้งเดียว", icon: LayoutGrid },
  { title: "ทำสัญญา / จอง", desc: "เลือกของที่ว่าง ใส่ผู้เช่า ระบบออกบิลแรกให้ทันที", icon: FileText },
  { title: "ออกบิล รับเงิน", desc: "แจ้งเตือนถึงรอบบิลและค้างชำระ ออกใบเสร็จอัตโนมัติ", icon: ReceiptText },
];

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker="วิธีใช้งาน" title="เริ่มได้ใน 3 ขั้นตอน" />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map(({ title, desc, icon: Icon }, i) => (
            <li key={title} className="relative rounded-3xl bg-canvas p-6">
              <span className="absolute top-5 right-6 text-5xl font-bold text-ink/10">{i + 1}</span>
              <span className="grid size-12 place-items-center rounded-2xl bg-ink text-brand">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                <Phrases text={desc} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const FEATURES = [
  { title: "ผังสถานที่", desc: "เห็นว่าห้องไหนว่าง มีผู้เช่า หรือค้างจ่าย ในภาพเดียว", icon: LayoutGrid },
  { title: "บิลและใบเสร็จ PDF", desc: "พิมพ์หรือส่งลูกค้าได้ทันที รองรับ VAT และหัก ณ ที่จ่าย", icon: ReceiptText },
  { title: "แยกเงินประกัน", desc: "รู้รายได้จริง ไม่ปนกับเงินประกันที่ต้องคืน", icon: PiggyBank },
  { title: "แจ้งเตือนงานค้าง", desc: "ถึงรอบบิล ค้างชำระ สัญญาใกล้หมด รวมไว้หน้าแรก", icon: BellRing },
  { title: "ใช้บนมือถือ", desc: "ติดตั้งเป็นแอปได้ จัดการหน้างานได้ทุกที่", icon: Smartphone },
  { title: "ทำงานเป็นทีม", desc: "แบ่งสิทธิ์เจ้าของ/พนักงาน มีประวัติว่าใครแก้อะไร", icon: Users },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
      <SectionTitle kicker="ฟีเจอร์" title="ทุกอย่างที่ธุรกิจเช่าต้องใช้" />
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ title, desc, icon: Icon }) => (
          <div key={title} className="flex gap-4 rounded-3xl bg-white p-5 ring-1 ring-line">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand text-ink">
              <Icon className="size-5" />
            </span>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-0.5 text-sm leading-relaxed text-muted">
                <Phrases text={desc} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-6">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-ink px-6 py-14 text-center text-white sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          พร้อมจัดการธุรกิจเช่า
          <br className="sm:hidden" /> ให้ง่ายขึ้นหรือยัง<span className="text-brand">?</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          <Phrases text="เริ่มจากสิ่งที่คุณให้เช่าอยู่วันนี้ แล้วเพิ่มอย่างอื่นเมื่อพร้อม" />
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex h-13 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-brand px-8 text-base font-semibold text-ink transition hover:bg-brand-strong active:scale-[0.98] sm:w-auto"
        >
          เริ่มใช้งาน <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center">
      <span className="text-sm font-semibold text-brand-strong">{kicker}</span>
      <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
        <Phrases text={title} />
      </h2>
      <span aria-hidden className="mx-auto mt-3 block h-1 w-10 rounded-full bg-brand" />
    </div>
  );
}

/**
 * ภาษาไทยไม่เว้นวรรคระหว่างคำ เบราว์เซอร์จึงตัดบรรทัดกลางวลีได้ (เช่น "ที่ / เดียว")
 * แยกตามช่องว่างแล้วให้แต่ละวลีอยู่บรรทัดเดียวกันเสมอ
 */
function Phrases({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {w}
          {i < text.split(" ").length - 1 && " "}
        </span>
      ))}
    </>
  );
}
