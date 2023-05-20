export type ISOLangCountry = `${Lowercase<string>}_${Uppercase<string>}`;

type I18nType = { [ll_CC: ISOLangCountry]: { [key: string]: string } };

export const labels: I18nType = {
  en_US: {
    continue: "Continue with Facebook",
    login: "Login with Facebook",
  },
  fr_FR: {
    continue: "Continuer avec Facebook",
    login: "Connexion avec Facebook",
  },
  ar_AR: {
    continue: "متابعة مع فيسبوك",
    login: "تسجيل الدخول باستخدام فيسبوك",
  },
  es_ES: {
    continue: "Continuar con Facebook",
    login: "Iniciar sesión con Facebook",
  },
  de_DE: {
    continue: "Mit Facebook fortfahren",
    login: "Mit Facebook anmelden",
  },
  pt_PT: {
    continue: "Continuar com o Facebook",
    login: "Entrar com o Facebook",
  },
  zh_CN: {
    continue: "继续使用 Facebook",
    login: "使用 Facebook 登录",
  },
  he_IL: {
    continue: "המשך עם פייסבוק",
    login: "התחבר עם פייסבוק",
  },
};

export function getNavigatorLanguage(): ISOLangCountry {
  let language = "en";
  // Use navigator language
  if (typeof navigator !== "undefined" && navigator.language)
    language = navigator.language;
  // Use ISO language code
  if (language.includes("-")) language = language.replace("-", "_");
  // Mapping of language codes to ISO language codes with default country codes
  const languageMapping: { [ll: string]: string } = {
    en: "en_US",
    fr: "fr_FR",
    ar: "ar_AR",
    es: "es_ES",
    de: "de_DE",
    pt: "pt_PT",
    zh: "zh_CN",
    he: "he_IL",
  };
  // Map language if not ll_CC
  if (!language?.includes("_")) language = languageMapping[language];
  return language as ISOLangCountry;
}
