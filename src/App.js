import logo from './logo.svg';
import './App.css';
import BaiTapForm from './BaiTapForm/BaiTapForm';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<BaiTapForm />} />
      </Routes>


    </div>
  );
}

export default App;
