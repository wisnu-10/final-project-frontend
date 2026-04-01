import AboutUs from "./components/aboutUs";
import Contact from "./components/contact";
import Discount from "./components/discount";
import Hero from "./components/hero";
import Price from "./components/price";
import Process from "./components/process";
import Service from "./components/service";
import Loading from "../../components/loading";
import PageError from "@/components/pageError";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f4e7d6]">
      <Hero />
      <AboutUs />
      <Service />
      <Process />
      <Price />
      <Discount />
      <Contact />
    </main>
  );
}
