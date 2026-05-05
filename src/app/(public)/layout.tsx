import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { Toaster } from "react-hot-toast";

export default function PublicLayout({
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
