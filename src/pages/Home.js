import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeatureRooms from '../components/FeatureRooms';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

const Home = () => {
  const services = [
    {
      icon: <FaCocktail size={32} />,
      title: 'Free Cocktails',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, amet?'
    },
    {
      icon: <FaHiking size={32} />,
      title: 'Endless Hiking',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, amet?'
    },
    {
      icon: <FaShuttleVan size={32} />,
      title: 'Free Shuttle',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, amet?'
    },
    {
      icon: <FaBeer size={32} />,
      title: 'Strongest Beer',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, amet?'
    }
  ];

  return (
    <>
      <Hero>
        <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
          <Link to='/rooms/' className="btn-primary">
          our rooms
          </Link>
        </Banner>
      </Hero>
      <Services services={services} />
      <FeatureRooms />
    </>
  );
};

export default Home;
