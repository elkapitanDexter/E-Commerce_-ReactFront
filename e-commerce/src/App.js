import './assets/App.css';

import {Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'

import Home from './pages/HomePage'
import About from './pages/AboutPage'
import NotFound from './pages/NotFound'
import UserAccount from './pages/UserAccount'

export default function App() {
  return (
    <div>
      <NavBar/>
      <br/><br/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/About" element={ <About/> } />
        <Route path="/Account" >
          <Route index element={ <UserAccount/> }/>
          <Route path=":selectedMenu">
            <Route index element={ <UserAccount/> }/>
            <Route path=":subSelectedMenu" element={ <UserAccount/> } />
          </Route>
        </Route>
        {/* <Route path="/books" element={<BookLayout/>}>
          <Route index element={ <Books/> } />
          <Route path=":id" element={ <Book/> } />
        </Route> */}
        {/* 
        <Route path="/Books" element={ <Books/> } />
        <Route path="/Books/:id" element={ <Book/> } /> */}
        <Route path="*" element={ <NotFound/> } />
      </Routes>
    </div>
  );
}
