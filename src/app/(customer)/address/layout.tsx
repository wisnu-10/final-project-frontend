'use client'

import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import withAuth from "@/hoc/useAuthGuard";
import { Toaster } from "react-hot-toast";

function addressLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      
      {children}

      <Footer />
    </div>
  );
}

export default withAuth(addressLayout, ["customer"])
