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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <header className="flex flex-col justify-center h-16">            
            <NoSSRNav />
          </header>
          <main className="main-container">
            {children}
          </main>
          <footer>
            <Footer/>
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
