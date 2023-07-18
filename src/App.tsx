import React from 'react';
import logo from './logo.svg';
import Figma from './figma.png'
import './App.css';
import HomeSection from './components/LogoutMenuCom/HomeSection';
import Navbar from './components/LogoutMenuCom/Navbar';
import WhyUsSection from './components/LogoutMenuCom/WhyUsSection';
import Footer from './components/LogoutMenuCom/Footer';
import AboutUs from './components/LogoutMenuCom/AboutUs';
import './index.css';
import Router from './Routes/routes';
function App() {


  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={Figma} className="App-logo" alt="logo" />
    //     <p>
    //       Golfkub
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      <Router/>
    </>
  );
}

export default App;
