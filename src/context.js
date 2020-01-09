import React, { Component } from 'react';
// import items from './data';
import Client from './Contentful';

const RoomContext = React.createContext();

class RoomProvider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rooms: [],
      sortedRooms: [],
      featuredRooms: [],
      loading: true,
      type: 'all',
      capacity: '1',
      price: 0,
      minPrice: 0,
      maxPrice: 0,
      minSize: 0,
      maxSize: 0,
      breakfast: false,
      pets: false
    };
  }

  // getData
  getData = async () => {
    try {
      const response = await Client.getEntries({
        content_type: 'beachResortRoom',
        // order: 'sys.createdAt'
        order: '-fields.price'
      });
      const rooms = this.formatData(response.items);
      const featuredRooms = rooms.filter(room => room.featured === true);
      const maxPrice = Math.max(...rooms.map(item => item.price));
      const maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms,
        sortedRooms: rooms,
        featuredRooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount () {
    this.getData();
  }

  formatData (items) {
    const tempItems = items.map(item => {
      const id = item.sys.id;
      const images = item.fields.images.map(image => image.fields.file.url);
      const room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    const tempRooms = this.state.rooms;
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    }, this.filterRooms);
  }

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    // all the rooms
    let tempRooms = [...rooms];
    // transform value
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);
    // filter by size
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);
    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast);
    }
    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets);
    }
    this.setState({
      sortedRooms: tempRooms
    });
  }

  render () {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer (Component) {
  return (
    <RoomConsumer>
      {value => <Component context={value} />}
    </RoomConsumer>
  );
};

export { RoomProvider, RoomConsumer, RoomContext };
