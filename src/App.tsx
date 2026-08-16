import { Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Components/Navbar';
import './App.css';
import "./fonts/CopperplateGothic.ttf"
import Center from './Components/Center';
import Adeptus from './Components/Adeptus';
import Archmagos from './Components/Archmagos';
import Showcase from './Components/Showcase';
import CodexTable from './Pages/Codex/CodexTable';
import RegisterForm from './Pages/Codex/RegisterForm';
import DocsIndex from './Pages/Codex/DocsIndex';
import DocPage from './Pages/Codex/DocPage';
import DesignBuilder from './Pages/Design/DesignBuilder';

function Home() {
  return (
    <>
      <Center></Center>
      <Adeptus></Adeptus>
      <Archmagos></Archmagos>
      <Showcase></Showcase>
    </>
  );
}

function App() {
  AOS.init({
    duration: 2500,
    delay: 400
  });
  return (

    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<DesignBuilder />} />
        <Route path="/codex" element={<CodexTable />} />
        <Route path="/codex/register" element={<RegisterForm />} />
        <Route path="/codex/docs" element={<DocsIndex />} />
        <Route path="/codex/docs/:doc" element={<DocPage />} />
        <Route
          path="/codex/registration-tracking"
          element={<Navigate to="/codex" replace />}
        />
      </Routes>
    </div>

  );
}

export default App;
