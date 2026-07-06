"use client";

import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("login");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{t("title")}</h1>

      <input placeholder={t("email")} />
      <br />
      <br />

      <input placeholder={t("password")} type="password" />
      <br />
      <br />

      <button>{t("button")}</button>
    </div>
  );
}
