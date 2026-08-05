import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Pulse360 - AP and India News",
  description: "Get latest news from Andhra Pradesh and India",
  openGraph: {
    title: "Pulse360 - AP and India News",
    description: "Get latest news from Andhra Pradesh and India",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
