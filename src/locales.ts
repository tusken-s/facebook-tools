export type ISOLangCountry = `${Lowercase<string>}_${Uppercase<string>}`;

type I18nType = { [ll_CC: ISOLangCountry]: { [key: string]: string } };

const supportedLanguages: { [ll: string]: string } = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_AR",
  es: "es_ES",
  de: "de_DE",
  pt: "pt_PT",
  zh: "zh_CN",
  he: "he_IL",
};

export const labels: I18nType = {
  en_US: {
    continue_with: "Continue with Facebook",
    login_with: "Login with Facebook",
  },
  fr_FR: {
    continue_with: "Continuer avec Facebook",
    login_with: "Connexion avec Facebook",
  },
  ar_AR: {
    continue_with: "متابعة مع فيسبوك",
    login_with: "تسجيل الدخول باستخدام فيسبوك",
  },
  es_ES: {
    continue_with: "Continuar con Facebook",
    login_with: "Iniciar sesión con Facebook",
  },
  de_DE: {
    continue_with: "Mit Facebook fortfahren",
    login_with: "Mit Facebook anmelden",
  },
  pt_PT: {
    continue_with: "Continuar com o Facebook",
    login_with: "Entrar com o Facebook",
  },
  zh_CN: {
    continue_with: "继续使用 Facebook",
    login_with: "使用 Facebook 登录",
  },
  he_IL: {
    continue_with: "המשך עם פייסבוק",
    login_with: "התחבר עם פייסבוק",
  },
};

/**
 * Get the ISO language code based on the navigator language or fallback to the nearest alternative.
 * @returns {ISOLangCountry} The ISO language code.
 */
export function getNavigatorLanguage(): ISOLangCountry {
  let language = "en";
  if (typeof navigator !== "undefined" && navigator.language) {
    const navigatorLanguage = navigator.language.slice(0, 2);
    if (supportedLanguages[navigatorLanguage]) {
      language = navigator.language;
    }
  }
  if (language.includes("-")) {
    language = language.replace("-", "_");
  }
  if (!language.includes("_")) {
    if (supportedLanguages[language]) {
      language = supportedLanguages[language];
    } else {
      const languageCode = language.split("_")[0];
      const fallbackLanguage = Object.values(supportedLanguages).find((value) =>
        value.startsWith(languageCode)
      );
      language = fallbackLanguage || language;
    }
  }
  return language as ISOLangCountry;
}
