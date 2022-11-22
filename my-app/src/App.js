import logo from './logo.svg';
import React , {useState} from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InteractiveIntroDonuts from './InteractiveIntroDonuts.js';
import ParticipantDonutContainer from './ParticipantDonutContainer';
import PreludeDisplay from './PreludeDisplay';

function App() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div className="App">
      <PreludeDisplay/>
    </div>
  );
}

export default App;
