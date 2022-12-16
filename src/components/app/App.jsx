import { Routes, Route } from 'react-router-dom'

import Header from '../header/Header';
import Home  from '../../pages/Home';
import Basket from '../../pages/Basket'
import NotFound from '../../pages/NotFound';

import './app.scss'

function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Basket />}/>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;


