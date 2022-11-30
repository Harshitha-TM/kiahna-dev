const production = {
    url: 'https://ki-ah-na.herokuapp.com/'
  };
  const development = {
    url: 'http://localhost:8080'
  };
  export const config = process.env.NODE_ENV === 'development' ? development : production;