
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import HelloWorld from './pages/helloworld';
import MemberRegistration from './pages/MemberRegistration';

const App = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Jboss migration to REACT + Spring</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/helloworld" element={<HelloWorld />} />
          <Route path="/kitchensink" element={<MemberRegistration />} />
        </Routes>
      </BrowserRouter>
      
    </Container>
   
  </Container>
);

export default App;
