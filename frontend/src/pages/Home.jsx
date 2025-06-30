import './Home.css';

const Home = () => {
  return (
    <div className='homeContainer'>
      <div className="video-wrapper">
        <video
          autoPlay
          muted
          loop
          className="video-background"
          playsInline
        >
          <source src="/videos/frog1.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="homeContent">
        <h1 className='homeTitle'>Welcome to <br /> <span className='canopy'><span className='calm'>Mind</span><span className='canopy-word'>Leap</span></span></h1>
        <p className="homeSubtitle">Hop into a happier you — track moods, build habits, and grow mentally strong with your frog companion!</p>
        <img className="forest" src="'/pictures/forest3.jpg'" alt="" />
      </div>
    </div>
  );
};

export default Home;