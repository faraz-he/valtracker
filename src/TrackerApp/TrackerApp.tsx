import { AppProps } from 'next/app';
import { GlobalWrappers } from '../GlobalWrappers/GlobalWrappers';

export const TrackerApp = ({ Component, pageProps }: AppProps) => (
  <GlobalWrappers>
    <Component {...pageProps} />
  </GlobalWrappers>
);
