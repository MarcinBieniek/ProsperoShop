import Configurator from '../components/Configurator';
import HelpSection from '../components/HelpSection';
import MainShop from '../components/MainShop';
import Shop from '../components/Shop';

const Home = () => {
  return (
    <div className='bg-white'>
      <Configurator />
      <HelpSection />
      <MainShop />
      <Shop />
    </div>
  )
}

export default Home
