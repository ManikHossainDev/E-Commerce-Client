const HeroSection = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 flex items-center justify-center text-center overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 h-64 w-64 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 h-48 w-48 bg-gradient-to-r from-pink-400 to-yellow-600 opacity-40 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-lg mb-6">
          Welcome to the Future
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Step into a world of endless possibilities. Harness cutting-edge
          technology to shape tomorrow, today.
        </p>
        <div className="flex justify-center space-x-6">
          <button className="px-8 py-3 bg-cyan-500 text-black rounded-lg shadow-lg font-semibold hover:bg-cyan-400 hover:shadow-cyan-500/50 transition">
            Learn More
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg font-semibold hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </section>
  );
};

export default HeroSection;
