import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Components/Navbar';
import './App.css';
import "./fonts/CopperplateGothic.ttf"
import Center from './Components/Center';
import Adeptus from './Components/Adeptus';
import Archmagos from './Components/Archmagos';
import Showcase from './Components/Showcase';
import CodexIndex from './Pages/CodexIndex';
import CodexDoc from './Pages/CodexDoc';
import RegistryPage from './Pages/RegistryPage';

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
        <Route path="/codex" element={<CodexIndex />} />
        <Route path="/codex/registration-tracking" element={<RegistryPage />} />
        <Route path="/codex/:doc" element={<CodexDoc />} />
      </Routes>
    </div>

  );
}

export default App;
