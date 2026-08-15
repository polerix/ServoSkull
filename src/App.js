import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Components/Navbar';
import './App.css';
import "./fonts/CopperplateGothic.ttf"
import Center from './Components/Center';
import Adeptus from './Components/Adeptus';
import Archmagos from './Components/Archmagos';
import Showcase from './Components/Showcase';

function App() {
  AOS.init({
    duration: 2500,
    delay: 400
  });
  return (

    <div>
      <Navbar></Navbar>
      <Center></Center>
      <Adeptus></Adeptus>
      <Archmagos></Archmagos>
      <Showcase></Showcase>
    </div>

  );
}

export default App;
