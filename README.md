<!-- MarkdownTOC autolink="true" autoanchor="true" -->

- [Create a new rails project](#create-a-new-rails-project)
- [Add fancytree yarn package](#add-fancytree-yarn-package)
    - [Add less and less-loader](#add-less-and-less-loader)
        - [yarn add less](#yarn-add-less)
        - [yarn add less-loader](#yarn-add-less-loader)
        - [Add less-loader to webpack environment](#add-less-loader-to-webpack-environment)
    - [Use fancytree](#use-fancytree)
        - [NOTE - import is kind of not working](#note---import-is-kind-of-not-working)
- [Start the application](#start-the-application)
    - [Open /books](#open-books)
    - [Change books.html.erb](#change-bookshtmlerb)
    - [Final picture](#final-picture)
- [Errors that might occur](#errors-that-might-occur)
    - [No less-loader](#no-less-loader)
    - [no less available](#no-less-available)

<!-- /MarkdownTOC -->

<a id="create-a-new-rails-project"></a>
# Create a new rails project

We want to have Fancrytree in this project.

```bash
$ rails new project_with_less_and_fancytree
$ cd project_with_less_and_fancytree
$ rails g scaffold books
$ rails db:migrate
```

<a id="add-fancytree-yarn-package"></a>
# Add fancytree yarn package

I like yarn.

```bash
$ yarn add jquery.fancytree
yarn add v1.22.4
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@1.2.12: The platform "linux" is incompatible with this module.
info "fsevents@1.2.12" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
warning " > webpack-dev-server@3.10.3" has unmet peer dependency "webpack@^4.0.0 || ^5.0.0".
warning "webpack-dev-server > webpack-dev-middleware@3.7.2" has unmet peer dependency "webpack@^4.0.0".
warning " > jquery.fancytree@2.35.0" has unmet peer dependency "jquery@>=1.9".
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ jquery.fancytree@2.35.0
info All dependencies
└─ jquery.fancytree@2.35.0
Done in 3.29s.
```

<a id="add-less-and-less-loader"></a>
## Add less and less-loader
Later to include fancytree we would have to do things like

```
import 'jquery.fancytree/dist/skin-lion/ui.fancytree.less'
```

This means fancytree uses LESS. So we need to process this .less files. Oh, css, oh you evil you. 

<a id="yarn-add-less"></a>
### yarn add less

```bash
$ yarn add less
yarn add v1.22.4
[1/4] Resolving packages...
warning less > request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
[2/4] Fetching packages...
info fsevents@1.2.12: The platform "linux" is incompatible with this module.
info "fsevents@1.2.12" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
warning " > jquery.fancytree@2.35.0" has unmet peer dependency "jquery@>=1.9".
warning " > less-loader@5.0.0" has unmet peer dependency "webpack@^2.0.0 || ^3.0.0 || ^4.0.0".
warning " > webpack-dev-server@3.10.3" has unmet peer dependency "webpack@^4.0.0 || ^5.0.0".
warning "webpack-dev-server > webpack-dev-middleware@3.7.2" has unmet peer dependency "webpack@^4.0.0".
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 4 new dependencies.
info Direct dependencies
└─ less@3.11.1
info All dependencies
├─ asap@2.0.6
├─ image-size@0.5.5
├─ less@3.11.1
└─ promise@7.3.1
Done in 5.80s.
```

<a id="yarn-add-less-loader"></a>
### yarn add less-loader

You need less and less-loader

```bash
$ yarn add less-loader
yarn add v1.22.4
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@1.2.12: The platform "linux" is incompatible with this module.
info "fsevents@1.2.12" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
warning " > jquery.fancytree@2.35.0" has unmet peer dependency "jquery@>=1.9".
warning " > webpack-dev-server@3.10.3" has unmet peer dependency "webpack@^4.0.0 || ^5.0.0".
warning "webpack-dev-server > webpack-dev-middleware@3.7.2" has unmet peer dependency "webpack@^4.0.0".
warning " > less-loader@5.0.0" has unmet peer dependency "less@^2.3.1 || ^3.0.0".
warning " > less-loader@5.0.0" has unmet peer dependency "webpack@^2.0.0 || ^3.0.0 || ^4.0.0".
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 2 new dependencies.
info Direct dependencies
└─ less-loader@5.0.0
info All dependencies
├─ clone@2.1.2
└─ less-loader@5.0.0
Done in 3.26s.
```


<a id="add-less-loader-to-webpack-environment"></a>
### Add less-loader to webpack environment

They must be registered. Probably in another file, but here in enrovonments.js is fine this tutorial. 

```
// config/webpack/environments.js

const { environment } = require('@rails/webpacker')

// THIS IS THE NEW CODE
const less_loader= {
  test: /\.less$/,
  use: ['css-loader', 'less-loader']
};
environment.loaders.append('less', less_loader)
// END: THIS IS THE NEW CODE

module.exports = environment

```

<a id="use-fancytree"></a>
## Use fancytree

Check out the documentation at https://github.com/mar10/fancytree/wiki#use-a-module-loader

But basically you must require fancytree and use it. 

```
// NOTE: This seems to be working
// app/javascripts/packs/application.js

//... some other code.

// THIS IS THE NEW CODE ADDED AT THE BOTTOM OF application.js
// Import LESS or CSS:
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
// END: THIS IS THE NEW CODE ADDED AT THE BOTTOM OF application.js
```

<a id="note---import-is-kind-of-not-working"></a>
### NOTE - import is kind of not working

There is another configuration at https://github.com/mar10/fancytree/wiki#use-a-module-loader but I could not make it work

```
// NOTE: This is not working
import 'jquery.fancytree/dist/skin-lion/ui.fancytree.less';  // CSS or LESS
import {createTree} from 'jquery.fancytree';
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';

const tree = createTree('#tree', {
  extensions: ['edit', 'filter'],
  source: [
      {title: "Node 1", key: "1"},
      {title: "Folder 2", key: "2", folder: true, children: [
        {title: "Node 2.1", key: "3"},
        {title: "Node 2.2", key: "4"}
      ]}
    ],
});
// Note: Loading and initialization may be asynchronous, so the nodes may not be accessible yet.
```

<a id="start-the-application"></a>
# Start the application

```bash
$ rails s
=> Booting Puma
=> Rails 6.0.2.2 application starting in development 
=> Run `rails server --help` for more startup options
Puma starting in single mode...
* Version 4.3.3 (ruby 2.6.5-p114), codename: Mysterious Traveller
* Min threads: 5, max threads: 5
* Environment: development
* Listening on tcp://127.0.0.1:3000
* Listening on tcp://[::1]:3000
Use Ctrl-C to stop
Started GET "/" for ::1 at 2020-04-22 09:20:06 +0300
   (0.4ms)  SELECT sqlite_version(*)
   (0.2ms)  SELECT "schema_migrations"."version" FROM "schema_migrations" ORDER BY "schema_migrations"."version" ASC
Processing by Rails::WelcomeController#index as HTML
  Rendering /home/user/.rvm/gems/ruby-2.6.5/gems/railties-6.0.2.2/lib/rails/templates/rails/welcome/index.html.erb
  Rendered /home/user/.rvm/gems/ruby-2.6.5/gems/railties-6.0.2.2/lib/rails/templates/rails/welcome/index.html.erb (Duration: 17.4ms | Allocations: 471)
Completed 200 OK in 45ms (Views: 25.4ms | ActiveRecord: 0.0ms | Allocations: 2931)


Started GET "/books" for ::1 at 2020-04-22 09:20:09 +0300
Processing by BooksController#index as HTML
  Rendering books/index.html.erb within layouts/application
  Book Load (0.2ms)  SELECT "books".* FROM "books"
  ↳ app/views/books/index.html.erb:13
  Rendered books/index.html.erb within layouts/application (Duration: 29.0ms | Allocations: 1230)
[Webpacker] Compiling...
[Webpacker] Compiled all packs in /home/user/axles/tmp/project_with_less_and_fancytree/public/packs
[Webpacker] Hash: 32e57f147dbdcbbf0c82
Version: webpack 4.43.0
Time: 2269ms
Built at: 04/22/2020 9:20:13 AM
                                     Asset       Size       Chunks                         Chunk Names
    js/application-bbe9c4a129ab949e0636.js    124 KiB  application  [emitted] [immutable]  application
js/application-bbe9c4a129ab949e0636.js.map    139 KiB  application  [emitted] [dev]        application
                             manifest.json  364 bytes               [emitted]              
Entrypoint application = js/application-bbe9c4a129ab949e0636.js js/application-bbe9c4a129ab949e0636.js.map
[./app/javascript/channels sync recursive _channel\.js$] ./app/javascript/channels sync _channel\.js$ 160 bytes {application} [built]
[./app/javascript/channels/index.js] 211 bytes {application} [built]
[./app/javascript/packs/application.js] 749 bytes {application} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 552 bytes {application} [built]
    + 3 hidden modules

Completed 200 OK in 3998ms (Views: 3994.1ms | ActiveRecord: 0.7ms | Allocations: 23364)

```

<a id="open-books"></a>
## Open /books

Visit http://localhost:3000/books. You should see no books

```
Started GET "/books" for ::1 at 2020-04-22 09:23:56 +0300
Processing by BooksController#index as HTML
  Rendering books/index.html.erb within layouts/application
  Book Load (0.2ms)  SELECT "books".* FROM "books"
  ↳ app/views/books/index.html.erb:13
  Rendered books/index.html.erb within layouts/application (Duration: 1.7ms | Allocations: 633)
[Webpacker] Compiling...
[Webpacker] Compilation failed:
Hash: 60e4cd172f04061a66be
Version: webpack 4.43.0
Time: 4365ms
Built at: 04/22/2020 9:24:02 AM
                                     Asset       Size       Chunks                         Chunk Names
    js/application-6ffd14b1620a1ad7ff96.js    717 KiB  application  [emitted] [immutable]  application
js/application-6ffd14b1620a1ad7ff96.js.map    841 KiB  application  [emitted] [dev]        application
                             manifest.json  364 bytes               [emitted]              
Entrypoint application = js/application-6ffd14b1620a1ad7ff96.js js/application-6ffd14b1620a1ad7ff96.js.map
[./app/javascript/channels sync recursive _channel\.js$] ./app/javascript/channels sync _channel\.js$ 160 bytes {application} [built]
[./app/javascript/channels/index.js] 211 bytes {application} [built]
[./app/javascript/packs/application.js] 1.52 KiB {application} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 552 bytes {application} [built]
    + 9 hidden modules


```

<a id="change-bookshtmlerb"></a>
## Change books.html.erb

Add a div element with id=tree

```
<%# app/vies/books/index.html.erb %>
<p id="notice"><%= notice %></p>

<!-- THIS HERE IS WHAT WE ARE ADDING -->

<div id="tree"></div>

<!-- END: THIS HERE IS WHAT WE ARE ADDING -->

<h1>Books</h1>

<table>
  <thead>
    <tr>
      <th colspan="3"></th>
    </tr>
  </thead>

  <tbody>
    <% @books.each do |book| %>
      <tr>
        <td><%= link_to 'Show', book %></td>
        <td><%= link_to 'Edit', edit_book_path(book) %></td>
        <td><%= link_to 'Destroy', book, method: :delete, data: { confirm: 'Are you sure?' } %></td>
      </tr>
    <% end %>
  </tbody>
</table>

<br>

<%= link_to 'New Book', new_book_path %>

```


<a id="final-picture"></a>
## Final picture

<a id="errors-that-might-occur"></a>
# Errors that might occur 

<a id="no-less-loader"></a>
## No less-loader
If no less loader is available the following could occur. 

```
Started GET "/books" for ::1 at 2020-04-22 08:52:40 +0300
   (0.1ms)  SELECT sqlite_version(*)
Processing by BooksController#index as HTML
  Rendering books/index.html.erb within layouts/application
  Book Load (0.2ms)  SELECT "books".* FROM "books"
  ↳ app/views/books/index.html.erb:13
  Rendered books/index.html.erb within layouts/application (Duration: 2.1ms | Allocations: 762)
[Webpacker] Compiling...
[Webpacker] Compilation failed:
Hash: 6210a48eff6aa0097a4c
Version: webpack 4.43.0
Time: 1464ms
Built at: 04/22/2020 8:52:43 AM
                                     Asset       Size       Chunks                         Chunk Names
    js/application-8dcd2b9e8cc222d43650.js    718 KiB  application  [emitted] [immutable]  application
js/application-8dcd2b9e8cc222d43650.js.map    841 KiB  application  [emitted] [dev]        application
                             manifest.json  364 bytes               [emitted]              
Entrypoint application = js/application-8dcd2b9e8cc222d43650.js js/application-8dcd2b9e8cc222d43650.js.map
[./app/javascript/channels sync recursive _channel\.js$] ./app/javascript/channels sync _channel\.js$ 160 bytes {application} [built]
[./app/javascript/channels/index.js] 211 bytes {application} [built]
[./app/javascript/packs/application.js] 1.07 KiB {application} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 552 bytes {application} [built]
    + 9 hidden modules

ERROR in ./node_modules/jquery.fancytree/dist/skin-lion/ui.fancytree.less 28:0
Module parse failed: Unexpected token (28:0)
File was processed with these loaders:
 * ./node_modules/less-loader/dist/cjs.js
You may need an additional loader to handle the result of these loaders.
|  * Helpers
|  *----------------------------------------------------------------------------*/
> .fancytree-helper-hidden {
|   display: none;
| }
 @ ./app/javascript/packs/application.js 19:0-59

```

<a id="no-less-available"></a>
## no less available

If less was not installed this would happen

```
Started GET "/books" for ::1 at 2020-04-22 09:26:54 +0300
Processing by BooksController#index as HTML
  Rendering books/index.html.erb within layouts/application
  Book Load (0.1ms)  SELECT "books".* FROM "books"
  ↳ app/views/books/index.html.erb:13
  Rendered books/index.html.erb within layouts/application (Duration: 2.1ms | Allocations: 617)
[Webpacker] Compiling...
[Webpacker] Compilation failed:
Hash: 1adef07918f113c9c28e
Version: webpack 4.43.0
Time: 1380ms
Built at: 04/22/2020 9:26:56 AM
                                     Asset       Size       Chunks                         Chunk Names
    js/application-b032c274e5b1d8d383da.js    721 KiB  application  [emitted] [immutable]  application
js/application-b032c274e5b1d8d383da.js.map    841 KiB  application  [emitted] [dev]        application
                             manifest.json  364 bytes               [emitted]              
Entrypoint application = js/application-b032c274e5b1d8d383da.js js/application-b032c274e5b1d8d383da.js.map
[./app/javascript/channels sync recursive _channel\.js$] ./app/javascript/channels sync _channel\.js$ 160 bytes {application} [built]
[./app/javascript/channels/index.js] 211 bytes {application} [built]
[./app/javascript/packs/application.js] 1.52 KiB {application} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 552 bytes {application} [built]
    + 9 hidden modules

ERROR in ./node_modules/jquery.fancytree/dist/skin-lion/ui.fancytree.less
Module build failed (from ./node_modules/less-loader/dist/cjs.js):
Error: Cannot find module 'less'
Require stack:
- /home/kireto/axles/tmp/pesho2/node_modules/less-loader/dist/index.js
- /home/kireto/axles/tmp/pesho2/node_modules/less-loader/dist/cjs.js
- /home/kireto/axles/tmp/pesho2/node_modules/loader-runner/lib/loadLoader.js
- /home/kireto/axles/tmp/pesho2/node_modules/loader-runner/lib/LoaderRunner.js
- /home/kireto/axles/tmp/pesho2/node_modules/webpack/lib/NormalModule.js
- /home/kireto/axles/tmp/pesho2/node_modules/webpack/lib/NormalModuleFactory.js
- /home/kireto/axles/tmp/pesho2/node_modules/webpack/lib/Compiler.js
- /home/kireto/axles/tmp/pesho2/node_modules/webpack/lib/webpack.js
- /home/kireto/axles/tmp/pesho2/node_modules/webpack-cli/bin/utils/validate-options.js
- /home/kireto/axles/tmp/pesho2/node_modules/webpack-cli/bin/utils/convert-argv.js
- /home/kireto/axles/tmp/pesho2/node_modules/webpack-cli/bin/cli.js
- /home/kireto/axles/tmp/pesho2/node_modules/webpack/bin/webpack.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:982:15)
    at Function.Module._load (internal/modules/cjs/loader.js:864:27)
    at Module.require (internal/modules/cjs/loader.js:1044:19)
    at require (/home/kireto/axles/tmp/pesho2/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)
    at Object.<anonymous> (/home/kireto/axles/tmp/pesho2/node_modules/less-loader/dist/index.js:8:36)
    at Module._compile (/home/kireto/axles/tmp/pesho2/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1178:10)
    at Module.load (internal/modules/cjs/loader.js:1002:32)
    at Function.Module._load (internal/modules/cjs/loader.js:901:14)
    at Module.require (internal/modules/cjs/loader.js:1044:19)
    at require (/home/kireto/axles/tmp/pesho2/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)
    at Object.<anonymous> (/home/kireto/axles/tmp/pesho2/node_modules/less-loader/dist/cjs.js:3:18)
    at Module._compile (/home/kireto/axles/tmp/pesho2/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1178:10)
    at Module.load (internal/modules/cjs/loader.js:1002:32)
    at Function.Module._load (internal/modules/cjs/loader.js:901:14)
    at Module.require (internal/modules/cjs/loader.js:1044:19)
    at require (/home/kireto/axles/tmp/pesho2/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)
    at loadLoader (/home/kireto/axles/tmp/pesho2/node_modules/loader-runner/lib/loadLoader.js:18:17)
    at iteratePitchingLoaders (/home/kireto/axles/tmp/pesho2/node_modules/loader-runner/lib/LoaderRunner.js:169:2)
    at iteratePitchingLoaders (/home/kireto/axles/tmp/pesho2/node_modules/loader-runner/lib/LoaderRunner.js:165:10)
    at /home/kireto/axles/tmp/pesho2/node_modules/loader-runner/lib/LoaderRunner.js:176:18
    at loadLoader (/home/kireto/axles/tmp/pesho2/node_modules/loader-runner/lib/loadLoader.js:47:3)
    at iteratePitchingLoaders (/home/kireto/axles/tmp/pesho2/node_modules/loader-runner/lib/LoaderRunner.js:169:2)
    at runLoaders (/home/kireto/axles/tmp/pesho2/node_modules/loader-runner/lib/LoaderRunner.js:365:2)
    at NormalModule.doBuild (/home/kireto/axles/tmp/pesho2/node_modules/webpack/lib/NormalModule.js:295:3)
    at NormalModule.build (/home/kireto/axles/tmp/pesho2/node_modules/webpack/lib/NormalModule.js:446:15)
    at Compilation.buildModule (/home/kireto/axles/tmp/pesho2/node_modules/webpack/lib/Compilation.js:739:10)
    at /home/kireto/axles/tmp/pesho2/node_modules/webpack/lib/Compilation.js:981:14
    at /home/kireto/axles/tmp/pesho2/node_modules/webpack/lib/NormalModuleFactory.js:409:6
 @ ./app/javascript/packs/application.js 20:0-59

Completed 200 OK in 2801ms (Views: 2800.1ms | ActiveRecord: 0.1ms | Allocations: 5363)

```

