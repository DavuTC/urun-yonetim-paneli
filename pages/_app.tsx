import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
