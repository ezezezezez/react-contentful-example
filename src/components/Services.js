import React, { Component } from 'react';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
import Title from './Title';
export default class Services extends Component {
  constructor (props) {
    super(props);
    this.state = {
      services: [
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
      ]
    };
  }

  render () {
    return (
      <section className="services">
        <Title title='services' />
        <div className="services-center">
          {this.state.services.map((item, idx) => (
            <article key={idx} className='services'>
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.info}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }
}
