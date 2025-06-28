import './Home.css';

const Home = () => {
  return (
    <div className='container'>
      <div className="content">
        <h1 className='title'>Welcome to <br /> <span className='canopy'><span className='calm'>Calm</span><span className='canopy-word'>Canopy</span></span></h1>
        <p className="subtitle">Track your mood, habits, and progress toward mental wellness.</p>
        <img className="firest" src="'/pictures/forest3.jpg'" alt="" />
      </div>
    </div>
  );
};

export default Home;