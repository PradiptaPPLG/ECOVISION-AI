import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main page sections */}
      <main className="flex-1">
        <Hero />
        <Features />
      </main>

      {/* Footer info & links */}
      <Footer />
    </>
  );
}
