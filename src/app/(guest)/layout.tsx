import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import HeaderNav from '../../component/Navbar/HeaderNav'
import TopNavbar from '../../component/TopNavbar/TopNavbar'
import Footer from '../../component/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReduxProvider } from "@/src/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <TopNavbar />
          <HeaderNav />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
