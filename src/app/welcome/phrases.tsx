import { Fragment } from "react";

/**
 * ภาษาไทยไม่เว้นวรรคระหว่างคำ เบราว์เซอร์จึงตัดบรรทัดกลางวลีได้
 * แยกตามช่องว่างแล้วให้แต่ละวลีอยู่บรรทัดเดียวกันเสมอ
 */
export function Phrases({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block whitespace-nowrap">{w}</span>
          {/* ช่องว่างอยู่นอก inline-block ไม่งั้นเบราว์เซอร์ตัดทิ้ง */}
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
