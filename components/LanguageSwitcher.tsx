import React from 'react';
import { useRouter } from 'next/router';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;

  
  if (!locales || !activeLocale) {
    return null; 
  }

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <select value={activeLocale} onChange={handleChangeLanguage}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale === 'en' ? 'English' : 'Türkçe'}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
