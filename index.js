module.exports = {
  Auth : require('./classes/Auth'),
};

const K8 = require('k8mvc');
K8.nodePackages[require.resolve('./index').replace('/index.js', '')] = true;