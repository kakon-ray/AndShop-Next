import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import HeaderNav from '../../component/Navbar/HeaderNav'
import TopNavbar from '../../component/TopNavbar/TopNavbar'
import Footer from '../../component/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardSidebar from "@/src/component/DashboardSidebar/DashboardSidebar";

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
        <TopNavbar />
        <HeaderNav />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <div className="dashboard-lg-sidebar">
                <DashboardSidebar />
              </div>
            </div>
            <div className="col-md-10">
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}