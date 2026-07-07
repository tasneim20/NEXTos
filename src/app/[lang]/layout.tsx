import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const locales = ["en", "ar"] as const;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as (typeof locales)[number])) {
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
