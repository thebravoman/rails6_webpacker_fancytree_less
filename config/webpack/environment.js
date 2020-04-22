const { environment } = require('@rails/webpacker')

// THIS IS THE NEW CODE
const less_loader= {
  test: /\.less$/,
  use: ['css-loader', 'less-loader']
};
environment.loaders.append('less', less_loader)
// END: THIS IS THE NEW CODE

module.exports = environment
