import React from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProductList from '../components/ProductList';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container">
      <LanguageSwitcher />
      <h1>{t('product_management')}</h1>
      <ProductList />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale || 'en';
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home;
