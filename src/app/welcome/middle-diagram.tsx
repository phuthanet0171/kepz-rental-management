import clsx from "clsx";
import { Check, Store, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

/**
 * Kepz อยู่ตรงกลาง: เจ้าของกิจการ ⇄ Kepz ⇄ ผู้เช่า (พื้นดำ ลายจุดจางๆ)
 * เลื่อนมาถึง: เจ้าของเลื่อนเข้าจากซ้าย ผู้เช่าจากขวา Kepz เด้งขึ้นตรงกลาง แล้วเส้นเชื่อมค่อยๆ ปรากฏ
 * เส้นประมีจุดวิ่งไปมา บอกว่างานไหลผ่าน Kepz ทั้งสองทาง · วงแหวนรอบ Kepz ขยายออกเบาๆ
 */
export function MiddleDiagram() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="relative scroll-mt-16 overflow-hidden bg-ink text-white [background-image:radial-gradient(rgb(255_255_255/0.07)_1.5px,transparent_1.5px)] [background-size:26px_26px]"
    >
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-20 sm:pt-28 sm:pb-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="how-title" className="text-3xl leading-[1.2] font-bold tracking-tight sm:text-5xl">
            Kepz คือผู้ช่วยที่อยู่ตรงกลาง <span className="inline-block">ระหว่างคุณกับผู้เช่า</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
            คุณใส่ข้อมูลห้องและผู้เช่าไว้ครั้งเดียว ที่เหลือ Kepz ช่วยคิดยอดบิล จดเงินที่รับ และบอกว่าใครยังไม่จ่าย
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col items-center lg:mt-20 lg:flex-row lg:items-start lg:justify-center">
          <Reveal variant="left" delay={100}>
            <Party
              icon={<Store className="size-9" strokeWidth={1.75} />}
              tone="bg-brand text-ink"
              title="เจ้าของกิจการ"
              items={["ใส่ห้อง ราคา และผู้เช่า", "กดออกบิลเมื่อถึงรอบ", "กดรับเงินเมื่อลูกค้าโอน"]}
            />
          </Reveal>
          <Reveal variant="fade" delay={500}>
            <Flow />
          </Reveal>
          <Reveal variant="pop" delay={300}>
            <Hub />
          </Reveal>
          <Reveal variant="fade" delay={650}>
            <Flow reverse />
          </Reveal>
          <Reveal variant="right" delay={100}>
            <Party
              icon={<UserRound className="size-9" strokeWidth={1.75} />}
              tone="bg-white text-ink"
              title="ผู้เช่า"
              items={["ได้บิลที่ยอดถูกต้อง", "โอนเงินตามยอดในบิล", "ได้ใบเสร็จไว้เป็นหลักฐาน"]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Party({ icon, tone, title, items }: { icon: ReactNode; tone: string; title: string; items: string[] }) {
  return (
    <div className="flex w-56 flex-col items-center text-center">
      <span className={clsx("grid size-24 place-items-center rounded-full border-[3px] border-white shadow-[4px_4px_0_0_rgb(255_255_255/0.25)]", tone)}>
        {icon}
      </span>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-[15px] text-white/65">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

/** เส้นเชื่อม: แนวนอนบนคอม แนวตั้งบนมือถือ · จุดเหลืองวิ่งไป จุดขาววิ่งกลับ */
function Flow({ reverse }: { reverse?: boolean }) {
  return (
    <div aria-hidden className="relative my-3 h-16 w-0.5 lg:mx-2 lg:my-0 lg:mt-12 lg:h-0.5 lg:w-24 xl:w-36">
      <span className="absolute inset-0 [background-image:repeating-linear-gradient(to_bottom,#ffffff_0_6px,transparent_6px_12px)] opacity-35 lg:[background-image:repeating-linear-gradient(to_right,#ffffff_0_6px,transparent_6px_12px)]" />
      <span className={clsx("flow-dot flow-a absolute size-3 rounded-full bg-brand shadow-[0_0_12px_2px_rgb(255_210_31/0.6)]", reverse && "[animation-delay:-1.2s]")} />
      <span className={clsx("flow-dot flow-b absolute size-2.5 rounded-full bg-white", reverse ? "[animation-delay:-0.4s]" : "[animation-delay:-1.6s]")} />
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
            className="hub-ring absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand/40"
            style={{ animationDelay: `${n * -1.2}s` }}
          />
        ))}
      </span>
      <span className="relative grid size-[7.5rem] place-items-center rounded-[2rem] border-[3px] border-white bg-brand text-3xl font-bold tracking-tight text-ink shadow-[0_0_40px_-4px_rgb(255_210_31/0.55)]">
        <span>
          kepz<span className="text-white">.</span>
        </span>
      </span>
      <h3 className="mt-5 text-xl font-bold">Kepz ทำให้</h3>
      <ul className="mt-3 space-y-2 text-left text-[15px] text-white/85">
        {["คิดยอดบิลให้ครบทุกห้อง", "ออกใบเสร็จ PDF ให้", "แยกค่าเช่ากับเงินประกัน", "บอกว่าใครค้างจ่าย"].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-ink">
              <Check className="size-3" strokeWidth={3.5} />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
