import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pages from './Pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages />} />
      </Routes>
    </Router>
  );
}

export default App;
