import clsx from "clsx";
import { Check, Store, UserRound } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Kepz อยู่ตรงกลาง: เจ้าของกิจการ ⇄ Kepz ⇄ ผู้เช่า
 * เส้นประมีจุดวิ่งไปมา บอกว่างานไหลผ่าน Kepz ทั้งสองทาง · วงแหวนรอบ Kepz ขยายออกเบาๆ
 * จอคอมเรียงซ้าย-ขวา มือถือเรียงบน-ล่าง
 */
export function MiddleDiagram() {
  return (
    <section id="how" aria-labelledby="how-title" className="scroll-mt-16 overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-title" className="text-3xl leading-[1.2] font-bold tracking-tight sm:text-5xl">
            Kepz อยู่ตรงกลาง <span className="inline-block">ระหว่างคุณกับผู้เช่า</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink/65 sm:text-lg">
            คุณจัดการทุกอย่างผ่าน Kepz ที่เดียว ผู้เช่าได้บิลและใบเสร็จที่ถูกต้องทุกครั้ง
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center lg:mt-20 lg:flex-row lg:items-start lg:justify-center">
          <Party
            icon={<Store className="size-9" strokeWidth={1.75} />}
            tone="bg-brand"
            title="เจ้าของกิจการ"
            items={["ตั้งราคาและทำสัญญา", "กดออกบิลตามรอบ", "ดูรายรับทุกสาขา"]}
          />
          <Flow />
          <Hub />
          <Flow reverse />
          <Party
            icon={<UserRound className="size-9" strokeWidth={1.75} />}
            tone="bg-white"
            title="ผู้เช่า"
            items={["ได้บิลพร้อมช่องทางโอน", "โอนเงินตามยอดในบิล", "ได้ใบเสร็จทันที"]}
          />
        </div>
      </div>
    </section>
  );
}

function Party({ icon, tone, title, items }: { icon: ReactNode; tone: string; title: string; items: string[] }) {
  return (
    <div className="flex w-56 flex-col items-center text-center">
      <span className={clsx("grid size-24 place-items-center rounded-full border-[3px] border-ink shadow-[4px_4px_0_0_#1b1a17]", tone)}>
        {icon}
      </span>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-[15px] text-ink/70">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

/** เส้นเชื่อม: แนวนอนบนคอม แนวตั้งบนมือถือ · จุดเหลืองวิ่งไป จุดดำวิ่งกลับ */
function Flow({ reverse }: { reverse?: boolean }) {
  return (
    <div aria-hidden className="relative my-3 h-16 w-0.5 lg:mx-2 lg:my-0 lg:mt-12 lg:h-0.5 lg:w-24 xl:w-36">
      <span className="absolute inset-0 [background-image:repeating-linear-gradient(to_bottom,#1b1a17_0_6px,transparent_6px_12px)] opacity-30 lg:[background-image:repeating-linear-gradient(to_right,#1b1a17_0_6px,transparent_6px_12px)]" />
      <span className={clsx("flow-dot flow-a absolute size-3 rounded-full border-2 border-ink bg-brand", reverse && "[animation-delay:-1.2s]")} />
      <span className={clsx("flow-dot flow-b absolute size-2.5 rounded-full bg-ink", reverse ? "[animation-delay:-0.4s]" : "[animation-delay:-1.6s]")} />
    </div>
  );
}

function Hub() {
  return (
    <div className="relative flex w-72 flex-col items-center text-center">
      {/* วงแหวนขยายออกจาก Kepz */}
      <span aria-hidden className="pointer-events-none absolute top-[3.75rem] left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((n) => (
          <span
            key={n}
            className="hub-ring absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink/15"
            style={{ animationDelay: `${n * -1.2}s` }}
          />
        ))}
      </span>
      <span className="relative grid size-[7.5rem] place-items-center rounded-[2rem] border-[3px] border-ink bg-ink text-3xl font-bold tracking-tight text-white shadow-[5px_5px_0_0_#ffd21f]">
        <span>
          kepz<span className="text-brand">.</span>
        </span>
      </span>
      <h3 className="mt-5 text-xl font-bold">Kepz ทำให้</h3>
      <ul className="mt-3 space-y-2 text-left text-[15px]">
        {["ออกบิลครบทุกห้องตามรอบ", "บันทึกเงินที่รับ ออกใบเสร็จ", "แยกค่าเช่ากับเงินประกันให้", "เตือนเมื่อมีคนค้างจ่าย"].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand">
              <Check className="size-3" strokeWidth={3.5} />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
