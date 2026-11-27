"use client";

import { ArrowRight, FileSignature, ReceiptText, UserPlus } from "lucide-react";
import Link from "next/link";
import { type Draft, unitCodes } from "@/lib/onboarding";
import { BusinessTag } from "./preview";

const NEXT = [
  { icon: UserPlus, title: "เพิ่มผู้เช่าคนแรก", desc: "ชื่อ เบอร์โทร และรูปบัตรประชาชน" },
  { icon: FileSignature, title: "ทำสัญญาเช่า", desc: "เลือกช่องที่ว่าง ใส่วันเริ่ม ระบบคิดเงินประกันให้" },
  { icon: ReceiptText, title: "ออกบิลแรก", desc: "ถึงรอบเมื่อไร บิลจะขึ้นรอที่หน้าแรกให้กดออก" },
];

/** ตั้งค่าเสร็จ: สรุป + บอกสิ่งที่ต้องทำต่อไปตามลำดับ */
export function Done({ draft, onEdit }: { draft: Draft; onEdit: () => void }) {
  const total = draft.groups.reduce((a, g) => a + unitCodes(g).length, 0);
  return (
    <div className="min-h-dvh bg-brand">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-5 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="step-in">
          <p className="hand text-2xl text-ink/70">เรียบร้อย!</p>
          <h1 className="mt-2 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
            {draft.business.name} พร้อมใช้งาน
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink/75">
            สร้าง{draft.branch.name}พร้อมของให้เช่า {total} ช่องแล้ว ตอนนี้ทุกช่องยังว่าง ทำ 3 อย่างนี้ต่อ ก็เริ่มเก็บค่าเช่าได้เลย
          </p>

          <ol className="mt-8 space-y-3">
            {NEXT.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="flex items-center gap-4 rounded-2xl border-2 border-ink bg-white p-4">
                <span className="tabular grid size-10 shrink-0 place-items-center rounded-full bg-ink text-lg font-bold text-brand">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold">{title}</span>
                  <span className="block text-sm text-muted">{desc}</span>
                </span>
                <Icon className="size-6 shrink-0 text-ink-2" />
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/" className="ink-cta w-full sm:w-auto">
              <span>ไปหน้าภาพรวม</span>
              <span aria-hidden className="ink-cta-mark">
                <ArrowRight className="ink-cta-arrow" strokeWidth={2.5} />
                <ArrowRight className="ink-cta-arrow" strokeWidth={2.5} />
              </span>
            </Link>
            <button type="button" onClick={onEdit} className="btn btn-ghost h-12 text-base">
              กลับไปแก้ข้อมูล
            </button>
          </div>
          <p className="mt-6 text-sm text-ink/60">ต้นแบบหน้าเว็บ: ข้อมูลที่กรอกยังเก็บไว้ในเครื่องนี้เท่านั้น ยังไม่บันทึกลงระบบ</p>
        </div>
        <div className="hidden lg:block">
          <BusinessTag draft={draft} />
        </div>
      </div>
    </div>
  );
}
