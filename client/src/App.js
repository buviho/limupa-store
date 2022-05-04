import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
import MainPages from './components/mainpages/Pages';
import Footer from './components/footers/Footers';
import ChatBot from './components/chatbot';

function App() {
  return (
    <Router>
      <DataProvider>
        <div className="App">
          <Header />
          <MainPages />
          <ChatBot />
          <Footer />
        </div>
      </DataProvider> 
    </Router>
  );
}

export default App;
