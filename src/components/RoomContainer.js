import React, { useContext } from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import { RoomContext } from '../context';
import Loading from './Loading';
const RoomContainer = () => {
  const ctx = useContext(RoomContext);
  const { loading, sortedRooms, rooms } = ctx;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </>
  );
};

export default RoomContainer;
