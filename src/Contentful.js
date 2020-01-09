import { createClient } from 'contentful';

export default createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_API,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
});
