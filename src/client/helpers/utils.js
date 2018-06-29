const setPublicPath = () => {
  let url = '/';

  // TODO change these to .env variables
  if (process.env.NODE_ENV === 'production') {
    url = 'https://your-host.com/production/';
  } else if (process.env.NODE_ENV === 'staging') {
    url = 'https://your-host.com/staging/';
  }

  return url;
};

const isProd = function() {
  return process.env.NODE_ENV === 'production';
};

export default {
  isProd,
  setPublicPath,
};
