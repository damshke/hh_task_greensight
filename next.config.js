const path = require('path');

/**
 * @type {import('next-react-svg').NextReactSvgConfig}
 */
const nextReactSvgConfig = {
  include: path.resolve(__dirname, './src/app/icons'),
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {};

const withReactSvg = require('next-react-svg')(nextReactSvgConfig);

module.exports = withReactSvg(nextConfig);