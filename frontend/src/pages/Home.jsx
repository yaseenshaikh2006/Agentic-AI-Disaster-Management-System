import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#050b1f]">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default Home;