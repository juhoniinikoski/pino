import * as React from 'react';
import Box from '../../components/box/Box';

const Home = () => {
  return (
    <div className="container">
      <h1>Huomenta, @juhoniinikoski 🌤</h1>
      <input className="search-bar"></input>
      <h2>Viimeksi katsotut kanavat</h2>
      <div className="box-container">
        <Box />
        <Box />
      </div>
    </div>
  );
};

export default Home;
