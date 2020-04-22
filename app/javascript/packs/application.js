// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import 'jquery.fancytree/dist/skin-lion/ui.fancytree.less'

const $ = require('jquery');

const fancytree = require('jquery.fancytree');
require('jquery.fancytree/dist/modules/jquery.fancytree.edit');
require('jquery.fancytree/dist/modules/jquery.fancytree.filter');

console.log(fancytree.version);

$(function(){
  $('#tree').fancytree({
    extensions: ['edit', 'filter'],
    source: [
      {title: "Node 1", key: "1"},
      {title: "Folder 2", key: "2", folder: true, children: [
        {title: "Node 2.1", key: "3"},
        {title: "Node 2.2", key: "4"}
      ]}
    ],
  });
  const tree = fancytree.getTree('#tree');
  // Note: Loading and initialization may be asynchronous, so the nodes may not be accessible yet.
})