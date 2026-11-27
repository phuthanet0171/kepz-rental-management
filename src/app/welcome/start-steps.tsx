const STEPS = [
  {
    title: "สมัครและตั้งชื่อธุรกิจ",
    body: "สมัครด้วยอีเมล แล้วตั้งชื่อร้าน หอพัก หรือตลาดของคุณ ใช้เวลาไม่ถึงนาที",
  },
  {
    title: "ใส่ของที่ให้เช่า",
    body: "เพิ่มห้อง ที่จอด หรือแผง ทีละช่องหรือหลายช่องพร้อมกัน จะวาดผังให้เหมือนสถานที่จริงด้วยก็ได้",
  },
  {
    title: "ทำสัญญากับผู้เช่า",
    body: "กรอกชื่อผู้เช่า ค่าเช่า และรอบจ่าย จากนั้นเมื่อถึงรอบ บิลจะขึ้นมารอให้กดออกเอง",
  },
];

/** เริ่มใช้งาน 3 ขั้น: ป้ายพวงกุญแจห้อยบนราวแขวนกุญแจ */
export function StartSteps() {
  return (
    <section aria-labelledby="start-title" className="mx-auto max-w-6xl px-5 pt-24 pb-10 sm:pt-32">
      <h2 id="start-title" className="max-w-xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl">
        เริ่มใช้งานได้ใน 3 ขั้น
      </h2>
      <p className="mt-3 max-w-lg text-lg leading-relaxed text-ink/65">
        ไม่ต้องติดตั้งโปรแกรม เปิดเว็บบนมือถือหรือคอมก็ใช้ได้เลย
      </p>

      <div className="relative mt-14">
        {/* ราวแขวนกุญแจ */}
        <div aria-hidden className="relative z-10 hidden h-3 rounded-full bg-[#1b1a17] shadow-[0_6px_12px_-6px_rgb(0_0_0/0.5)] sm:block" />
        <ol className="grid gap-6 sm:-mt-1.5 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.title} className="key-tag group relative sm:pt-3" style={{ ["--d" as string]: `${i * 0.4}s` }}>
              {/* ตะขอ + ห่วง */}
              <svg aria-hidden className="mx-auto hidden h-12 w-8 overflow-visible sm:block" viewBox="0 0 32 48">
                <path d="M16 0 V14" stroke="#1b1a17" strokeWidth="3" strokeLinecap="round" />
                <circle cx="16" cy="28" r="12" fill="none" stroke="#9a978e" strokeWidth="3" />
              </svg>
              <div className="key-body relative rounded-[1.75rem] border-2 border-ink bg-brand px-6 pt-9 pb-7 sm:-mt-3">
                <span aria-hidden className="absolute top-3.5 left-1/2 size-4 -translate-x-1/2 rounded-full border-2 border-ink bg-white" />
                <span className="tabular block text-6xl leading-none font-bold">{i + 1}</span>
                <h3 className="mt-4 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-ink/75">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
