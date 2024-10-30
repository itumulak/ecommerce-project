import localFont from "next/font/local"
import dynamic from 'next/dynamic';
import "./globals.css";

import Footer from '../components/Footer'
import ReduxProvider from "../components/ReduxProvider";

const NoSSRNav = dynamic(() => import('../components/Nav'), { ssr: false })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ecommerce App",
  description: "Created with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ReduxProvider>
          <header className="flex flex-col justify-center h-16">            
            <NoSSRNav />
          </header>
          <main className="main-container">
            {children}
          </main>
          <footer className="flex-1 flex flex-col justify-end">
            <Footer/>
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
