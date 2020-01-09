import React from 'react';
import Title from './Title';

const Services = ({services}) => {
  return (
    <section className="services">
      <Title title='services' />
      <div className="services-center">
        {services.map((item, idx) => (
          <article key={idx} className='services'>
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
