import './App.css';
import Main from './Main';
import MyCart from './MyCart';
import NoPage from './NoPage';
import store from './Store';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="*" element={<NoPage />} />
        
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
