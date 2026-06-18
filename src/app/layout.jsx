import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// FontAwesomeのコアCSS（アイコンを1emに収める）。これが無いとSVGが原寸で巨大化する
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://daichi-okamoto.com'),
  title: 'DAICHI OKAMOTO',
  description: 'WEBエンジニア、岡本能知（ダイチ）のポートフォリオサイトです。',
  // favicon は app/icon.png・app/apple-icon.png（file convention）で自動設定
  // OGP画像は app/opengraph-image.jpg・app/twitter-image.jpg（file convention）で自動設定
  openGraph: {
    title: 'DAICHI OKAMOTO',
    description: 'WEBエンジニア、岡本能知（ダイチ）のポートフォリオサイトです。',
    url: 'https://daichi-okamoto.com',
    siteName: 'DAICHI OKAMOTO',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DAICHI OKAMOTO',
    description: 'WEBエンジニア、岡本能知（ダイチ）のポートフォリオサイトです。',
  },
};

export const viewport = {
  themeColor: '#ECE4D6',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DW8KM4T2QH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DW8KM4T2QH');
          `}
        </Script>
      </body>
    </html>
  );
}
