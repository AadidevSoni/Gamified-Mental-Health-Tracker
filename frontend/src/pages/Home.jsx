import './Home.css';

const Home = () => {
  return (
    <div className='homeContainer'>
      <div className="homeContent">
        <h1 className='homeTitle'>Welcome to <br /> <span className='canopy'><span className='calm'>Calm</span><span className='canopy-word'>Canopy</span></span></h1>
        <p className="homeSubtitle">Track your mood, habits, and progress toward mental wellness.</p>
        <img className="forest" src="'/pictures/forest3.jpg'" alt="" />
      </div>
    </div>
  );
};

export default Home;