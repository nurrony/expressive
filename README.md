#Expressive#

> ###This repository is no longer maintained. It is obsolete

An attempt to make a configuration based cms build on [expressjs](http://www.expressjs.com) to boil with any DBMS System in MVC style. Still need to make templating system structure and in a very basic stage
but i am improving it in my spare time.

#Dependecies#
This depends on some fabulous modules listed bellow. Of course i found no words to thanks them

* [expressjs](http://www.expressjs.com)
* [lodash](http://lodash.com)
* [node-orm2](http://dresende.github.io/node-orm2/)

#How to Use#
There are some configuration files that you need to edit before installing it

* your server configuration settings in `config/index.js`
* your database system configuration setting in `config/database.js`
the key name  self explain their purpose.

#Database Schema Definition#
 your database schema definition should store in `config/dbSchema/<your-chosen-dbms>` directory where each
 table definition, relations and individual options are defined in each file. where filename is the name of
 db table created in Database

#Components#
This directory contains components defined in `config/index.js` components key. Each subdirectory here match the name from  `components` keys element.
each Component directory contains 2 subdirectories  and a index.js.  the hierarchy and purpose is shown bellow

```
components
  |
  |--frontend
  |   |- products
  |      |
  |      |--> models - frontend products models goes here (dir)
  |      |--> views - frontend products partial viewes here (dir)
  |      |-> index.js --> frontend routing defines here. work as controller
  |
  |--admin
      |-products
        |--> models - admin products models goes here (dir)
        |--> views - admin products partial viewes here (dir)
        |-> index.js --> admin routing defines here. work as controller

  ...
```
#How to set Global Variables#
If you need to set a global variable that will be needed through out your cms. then you can do it. in your `app.js` like bellow

```
cms.init(app,environment,{"my greeting": " Hello world"});

```

to retrive 'my greeting' from anywhere of your component

```
expressive.getGlobal('my greeting');

```
#How to install#
Define your dependencies in `package.json` and configure your environment in `app.json`. Make sure you have db configured and db exist fine.
Then run the following command from your project/app directory

```
npm install
```

# License
I dont believe on licensing. If it helps anyone and does not forget my name then I will be the happiest man in the world
