import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "../globals.css";

const locales = ["en", "ar"];

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params;

  if (!locales.includes(lang)) {
    notFound();
  }

  const messages = (await import(`@/messages/${lang}.json`)).default;

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <LanguageSwitcher />
      {children}
    </NextIntlClientProvider>
  );
}
