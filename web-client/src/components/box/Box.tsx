import * as React from 'react';
import './Box.css';

interface Props {
  title: string;
  style?: React.CSSProperties;
}

const Box = ({ title, style }: Props) => {
  return (
    <button style={style} className="box">
      <p>{title}</p>
    </button>
  );
};

export default Box;
