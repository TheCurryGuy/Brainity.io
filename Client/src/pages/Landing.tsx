import { BrainIcon } from "../icons/BrainIcon"
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Landing() {
    const navigate = useNavigate();
    function actionClick(){
        navigate("/signup")
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center p-6">
      {/* Navbar */}
      <nav className="w-full max-w-6xl flex justify-between items-center mb-12">
        <div className=" flex items-center gap-3 ">
            <BrainIcon />
            <div className="text-2xl font-bold text-purple-900">Brainity.io</div>
        </div>
        <div className="flex space-x-6">
          <a href="#features" className="text-purple-700 hover:text-purple-900">Features</a>
          <a href="#pricing" className="text-purple-700 hover:text-purple-900">Pricing</a>
        </div>
        <Button variant="primary" text="Get Started" onClick={actionClick} size="lg"/>
      </nav>

      {/* Hero Section */}
      <section className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold text-purple-900 mb-6">
          Organize Your Thoughts, <br /> Amplify Your Productivity
        </h1>
        <p className="text-xl text-purple-700 mb-8">
          Brainity.io is your second brain in the cloud, designed to help you capture, organize, and retrieve information effortlessly.
        </p>
        <button className="bg-purple-700 text-white px-8 py-3 rounded-lg text-lg hover:bg-purple-900 transition duration-300">
          Start Your Free Trial
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="mt-20 w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-purple-900 text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Capture Ideas</h3>
            <p className="text-purple-700">Quickly jot down ideas, notes, and thoughts anytime, anywhere.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Organize Effortlessly</h3>
            <p className="text-purple-700">Categorize and tag your notes for easy retrieval.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Sync Across Devices</h3>
            <p className="text-purple-700">Access your second brain from any device, anytime.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mt-20 w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-purple-900 text-center mb-12">Pricing</h2>
        <div className=" flex justify-center gap-8">
          <div className="bg-white w-1/2 p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Free</h3>
            <p className="text-purple-700 mb-6">Perfect for individuals getting started.</p>
            <p className="text-4xl font-bold text-purple-900 mb-6">$0<span className="text-lg">/month</span></p>
            <div className="flex justify-center">
            <Button variant="primary" text="Get Started" onClick={actionClick} size="lg"/>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 w-full max-w-6xl text-center text-purple-700">
        <a href="https://github.com/TheCurryGuy" target="_blank"><p>&copy; 2025 Brainity.io | TheCurryGuy | All rights reserved.</p></a>
      </footer>
    </div>
  );
};
