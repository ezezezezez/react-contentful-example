import React, { useState, useEffect } from 'react';
import Client from './Contentful';

const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('all');
  const [capacity, setCapacity] = useState('1');
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(0);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  useEffect(() => { getData(); }, []);
  useEffect(() => { filterRooms(); }, [type, capacity, price, minSize, maxSize, breakfast, pets]);

  // getData
  const getData = async () => {
    try {
      const response = await Client.getEntries({
        content_type: 'beachResortRoom',
        // order: 'sys.createdAt'
        order: '-fields.price'
      });
      const rooms = formatData(response.items);
      const featuredRooms = rooms.filter(room => room.featured === true);
      const maxPrice = Math.max(...rooms.map(item => item.price));
      const maxSize = Math.max(...rooms.map(item => item.size));
      setRooms(rooms);
      setSortedRooms(rooms);
      setFeaturedRooms(featuredRooms);
      setLoading(false);
      setPrice(maxPrice);
      setMaxPrice(maxPrice);
      setMaxSize(maxSize);
    } catch (error) {
      console.log(error);
    }
  };

  const formatData = items => {
    const tempItems = items.map(item => {
      const id = item.sys.id;
      const images = item.fields.images.map(image => image.fields.file.url);
      const room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  const getRoom = slug => {
    const tempRooms = rooms;
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  const handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    switch (name) {
      case 'type':
        setType(value);
        break;
      case 'capacity':
        setCapacity(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'minSize':
        setMinSize(value);
        break;
      case 'maxSize':
        setMaxSize(value);
        break;
      case 'breakfast':
        setBreakfast(value);
        break;
      case 'pets':
        setPets(value);
        break;
      default:
    }
  };

  const filterRooms = () => {
    const roomsLocal = rooms;
    const typeLocal = type;
    const capacityLocal = parseInt(capacity);
    const priceLocal = parseInt(price);
    const minSizeLocal = minSize;
    const maxSizeLocal = maxSize;
    const breakfastLocal = breakfast;
    const petsLocal = pets;
    // all the rooms
    let tempRooms = [...roomsLocal];
    // filter by type
    if (typeLocal !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === typeLocal);
    }
    // filter by capacity
    if (capacityLocal !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacityLocal);
    }
    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= priceLocal);
    // filter by size
    tempRooms = tempRooms.filter(room => room.size >= minSizeLocal && room.size <= maxSizeLocal);
    // filter by breakfast
    if (breakfastLocal) {
      tempRooms = tempRooms.filter(room => room.breakfast);
    }
    // filter by pets
    if (petsLocal) {
      tempRooms = tempRooms.filter(room => room.pets);
    }
    setSortedRooms(tempRooms);
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        sortedRooms,
        featuredRooms,
        loading,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
        getRoom,
        handleChange
      }}>
      {children}
    </RoomContext.Provider>
  );
};

const RoomConsumer = RoomContext.Consumer;
// HOC example
export function withRoomConsumer (Component) {
  return (
    <RoomConsumer>
      {value => <Component context={value} />}
    </RoomConsumer>
  );
};

export { RoomProvider, RoomConsumer, RoomContext };
