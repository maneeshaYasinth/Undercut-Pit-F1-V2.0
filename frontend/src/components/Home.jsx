import bgVideo from "../assets/bg-video.mp4";

function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div className="relative flex min-h-screen w-full items-center justify-center bg-black/40 text-white px-4 text-center overflow-hidden">

        {/* SPEED LINES */}
        <div className="speed-lines">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* TEXT */}
        <h1 className="sector-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
        font-[Orbitron] tracking-[0.3em] uppercase font-extrabold 
        text-white drop-shadow-[0_0_20px_rgba(255,0,0,1)] z-10">
          Sector 3
        </h1>

      </div>
    </div>
  );
}

export default Home;
