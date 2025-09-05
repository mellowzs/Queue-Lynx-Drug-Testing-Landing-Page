import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pages from './Pages';
import Form from './Pages/Form';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
