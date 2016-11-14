var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});


var pageContents = {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    urlTitle: {
      type: Sequelize.STRING,
      allowNull: false,
      isUrl:true
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    status: {
      type: Sequelize.ENUM('open', 'closed')
    }
 };

 var pageConfig = {
  getterMethods: {
    route: function(){
      console.log(this.dataValues)
      return '/wiki/'+ this.urlTitle;
    }
  },
  hooks: {
      beforeValidate: function(pageInstance){
        if(pageInstance.title){
          pageInstance.urlTitle = pageInstance.title.replace(/\s+/gi, '_').replace(/\W/g, '');
        }
        else {
          pageInstance.urlTitle = Math.random().toString(36).substring(2, 7);
        }
      }
    }
  };

//console.log('----------------------------'+pageGetSet.getterMethods.route());

var Page = db.define('page', pageContents, pageConfig);

var userContents = {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      isEmail: true
    }
  };

var User = db.define('user', userContents);

module.exports = {
  Page: Page,
  User: User
};
