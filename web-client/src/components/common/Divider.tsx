import React from 'react';

interface Props {
  style?: React.CSSProperties;
}

const Divider = ({ style }: Props) => {
  return (
    <div
      style={{ ...style, height: 2, backgroundColor: '#F6F6F6', width: '100%', marginTop: 16, marginBottom: 16 }}
    ></div>
  );
};

export default Divider;
