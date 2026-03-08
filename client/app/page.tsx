import Dock from "@/components/Dock";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import WindowManager from "@/components/WindowManager";

function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Welcome/>
      <WindowManager />
      <Dock />
    </div>
  );
}

export default Home;