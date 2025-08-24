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
      <div className="relative flex min-h-screen w-full items-center justify-center bg-black/40 text-white">
        <h1 className="text-8xl font-[pacifico] tracking-[0.1em] uppercase font-bold">
          UnderCutPit F1
        </h1>
      </div>
    </div>
  );
}

export default Home;
