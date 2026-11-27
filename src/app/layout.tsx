import type { Metadata, Viewport } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";

/** ตัวอักษรหลักทั้งเว็บ: ตัวไทยไม่มีหัว อ่านง่ายบนมือถือ (ชื่อตัวแปรคง --font-thai ไว้ให้ token เดิมใช้ต่อได้) */
const thai = Anuphan({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Kepz Management", template: "%s · Kepz" },
  description: "มีอะไรให้เช่า ก็จัดการได้บน Kepz",
  applicationName: "Kepz",
  appleWebApp: { capable: true, title: "Kepz", statusBarStyle: "default" },
  formatDetection: { telephone: false },
  icons: { icon: "/pwa-icon/192", apple: "/pwa-icon/180" },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// suppressHydrationWarning บน <html>: หน้าแรกเติมคลาส motion-ready ให้ html ก่อน React โหลด (ตั้งใจให้ต่างกัน)
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${thai.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
