"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLang = (lang: string) => {
    const newPath = pathname.replace(/^\/(en|ar)/, `/${lang}`);
    router.push(newPath);
  };

  return (
    <div style={{ position: "fixed", right: 20, top: 20 }}>
      <button onClick={() => switchLang("ar")}>عربي</button>
      <button onClick={() => switchLang("en")}>English</button>
    </div>
  );
}
