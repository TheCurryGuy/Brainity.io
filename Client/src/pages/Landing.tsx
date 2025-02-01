import { BrainIcon } from "../icons/BrainIcon";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Landing() {
  const navigate = useNavigate();

  function actionClick() {
    navigate("/signup");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center p-6">
      {/* Navbar */}
      <nav className="w-full max-w-6xl flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <BrainIcon />
          <div className="text-2xl font-bold text-purple-900">Brainity.io</div>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="text-purple-700 hover:text-purple-900 font-medium">
            Features
          </a>
          <a href="#pricing" className="text-purple-700 hover:text-purple-900 font-medium">
            Pricing
          </a>
        </div>
        <Button variant="primary" text="Get Started" onClick={actionClick} size="lg" className="hidden md:block" />
      </nav>

      {/* Hero Section */}
      <section className="text-center max-w-4xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-6">
          Organize Your Thoughts, <br /> Amplify Your Productivity
        </h1>
        <p className="text-lg md:text-xl text-purple-700 mb-8">
          Brainity.io is your second brain in the cloud, designed to help you capture, organize, and retrieve information effortlessly.
        </p>
        <button
          onClick={() => navigate("/signin")}
          className="bg-purple-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-lg hover:bg-purple-900 transition duration-300"
        >
          Sign In to Your Brain Here!
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="mt-18 w-full max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-900 text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-4">Capture Ideas</h3>
            <p className="text-purple-700">Quickly jot down ideas, notes, and thoughts anytime, anywhere.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-4">Organize Effortlessly</h3>
            <p className="text-purple-700">Categorize and tag your notes for easy retrieval.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-4">Sync Across Devices</h3>
            <p className="text-purple-700">Access your second brain from any device, anytime.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mt-20 w-full max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-900 text-center mb-12">Pricing</h2>
        <div className="flex justify-center">
          <div className="bg-white w-full md:w-1/2 p-6 md:p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-4">Free</h3>
            <p className="text-purple-700 mb-6">Perfect for individuals getting started.</p>
            <p className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
              $0<span className="text-lg">/month</span>
            </p>
            <div className="flex justify-center">
              <Button variant="primary" text="Get Started" onClick={actionClick} size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 w-full max-w-6xl text-center text-purple-700 px-4">
        <a href="https://github.com/TheCurryGuy" target="_blank" rel="noopener noreferrer">
          <p>&copy; 2025 Brainity.io | TheCurryGuy | All rights reserved.</p>
        </a>
      </footer>
    </div>
  );
}