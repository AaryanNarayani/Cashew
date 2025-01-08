import { useNavigate} from 'react-router-dom';

import {githubLogo, reactLogo, rightArrow} from '../assets';
import {ButtonHero} from '../components';
import Portfolio from '../components/Portfolio';

const HomePage = () => {
  const navigate = useNavigate();
  const handleSetStarted = () => {
    navigate('/signin');
  };

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
          {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <section className="max-container relative flex h-screen flex-col items-center justify-center px-1">
      <p className="absolute left-5 top-10 opacity-100 font-montserrat xl:left-0">
        <span className="font-medium">
          <a href="https://github.com/AaryanNarayani">
          <img 
          src={githubLogo}
          alt='Github Logo'
          className='ml-2 m-0 h-10 w-10'
          ></img>
          </a>
        </span>
      </p>
      
      <a href="https://react.dev/" target='_blank'>
      <img
        src={reactLogo}
        alt="React logo"
        className="h-14 animate-spin-slow hover:drop-shadow-[0_0_2rem_#646cff] md:h-16 lg:h-20"
      />
      </a>

      <h1 className="md:text-8xl mt-4 bg-gradient-to-r from-gray-400 to-gray-950 bg-clip-text font-palanquin text-[100px] font-extrabold text-transparent dark:from-gray-700 dark:to-white max-sm:leading-[82px] lg:mt-2 lg:text-[80px] xl:text-8xl">
        Cashew
      </h1>

      <h2 className="mb-10 mt-2 bg-clip-text pt-2 text-center font-montserrat text-lg text-foreground md:mt-1 md:text-[22px] lg:mb-14 lg:pt-3 lg:text-2xl lg:leading-8 xl:text-[26px]">
        Transforming Payments into&nbsp;a&nbsp;breeze!
      </h2>

      <ButtonHero
        onClick={handleSetStarted}
        label="Get Started"
        iconURL={rightArrow}
        roundedCorners="full"
      />
      
      <div className='mt-20 m-0'>
        <Portfolio />
      </div>
    </section>
    </div>
  );
};

export default HomePage;
