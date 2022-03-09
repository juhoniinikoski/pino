import * as React from 'react';
import './Sidebar.css';
import { CgArrowsV } from 'react-icons/cg';
import { BiWorld } from 'react-icons/bi';
import { IoMdStats } from 'react-icons/io';
import { MdWorkspaces } from 'react-icons/md';
import Divider from '../common/Divider';

type Props = {
  id: string;
  title: string;
  icon?: JSX.Element;
  style?: React.CSSProperties;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

const Button = ({ id, title, icon, style, setActive }: Props) => {
  const handleClick = () => {
    setActive(id);
  };

  return (
    <button onClick={handleClick} className="button" style={style}>
      {icon && icon}
      <p style={{ marginLeft: 8 }}>{title}</p>
    </button>
  );
};

const fixed = [
  {
    id: '1',
    title: 'Julkiset kanavat',
    icon: <BiWorld size={20} />,
  },
  {
    id: '2',
    title: 'Statistiikat',
    icon: <IoMdStats size={20} />,
  },
  {
    id: '3',
    title: 'Oma työtila',
    icon: <MdWorkspaces size={20} />,
  },
];

const SideBar = () => {
  const [active, setActive] = React.useState('1');

  return (
    <div className="sidebar">
      <div className='profile-button'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ height: 36, width: 36, background: 'blue', borderRadius: 8, marginLeft: 6 }}></div>
          <p style={{ marginLeft: 8 }}>@juhoniinikoski</p>
        </div>
        <CgArrowsV size={20} />
      </div>
      <Divider />
      {fixed.map((f) => (
        <Button
          setActive={setActive}
          key={f.id}
          id={f.id}
          style={f.id === active ? { backgroundColor: '#F6F6F6' } : {}}
          title={f.title}
          icon={f.icon}
        />
      ))}
      <Divider />
    </div>
  );
};

export default SideBar;
