import ShopPreview from '../components/ShopPreview';
import Configurator from '../components/Configurator';
import HelpSection from '../components/HelpSection';
import CompaniesLogos from '../components/CompaniesLogos';

const Home = () => {
  return (
    <div className='bg-white'>
      <Configurator />
      <HelpSection />
      <ShopPreview />
      <CompaniesLogos />
    </div>
  )
}

export default Home
