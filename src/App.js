import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/home';
// import Error from './pages/error';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Login />} />
          {/* <Route path={'/home'} element={<Home />} /> */}
          {/* <Route path={`${'/error'}/:errorCode?`} element={<Error />} /> */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
