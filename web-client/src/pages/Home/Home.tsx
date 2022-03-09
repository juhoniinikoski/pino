import * as React from 'react';
import Box from '../../components/box/Box';
import SearchBar from '../../components/searchbar/SearchBar';
import './Home.css';
import { fakeContent } from '../../utils/fakeContent';

const Home = () => {
  const recent = fakeContent.recent;
  const followed = fakeContent.followedChannels;
  const suggested = fakeContent.suggestedChannels;

  return (
    <div className="container">
      <h1>Huomenta, @juhoniinikoski 🌤</h1>
      <SearchBar />
      <h2>Viimeksi katsotut kanavat</h2>
      <div className="box-container-horizontal">
        {recent.map((r) => (
          <Box key={r.title} title={r.title} />
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <div className="channel-container" style={{ marginRight: 8 }}>
          <h2>Seuratut kanavat</h2>
          <div className="box-container">
            {followed.map((f) => (
              <Box key={f.title} title={f.title} style={{ marginBottom: 8 }} />
            ))}
          </div>
        </div>
        <div className="channel-container" style={{ marginLeft: 8 }}>
          <h2>Ehdotetut kanavat</h2>
          <div className="box-container">
            {suggested.map((s) => (
              <Box key={s.title} title={s.title} style={{ marginBottom: 8 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
