const NOT_NULL = 'NOT NULL';
const NULL = 'NULL';
const INT  = 'INTEGER';
const NUM  = 'REAL';
const TEXT = 'TEXT';
const BLOB = 'BLOB';

const BOOL = 'BOOLEAN';
const TRUE = 'TRUE';
const FALSE = 'FALSE';
const DATE = 'DATETIME';

const INode = {
  fields: {
    content : [TEXT] ,
    handle : [TEXT] ,
    title : [TEXT] ,
    description : [TEXT] ,
  }
};
const IName = {
  fields : {
    name : [TEXT, NOT_NULL],
  }
};
const IKeyValuePair = {
  fields : {
    name : [TEXT, NOT_NULL],
    value : [TEXT, NOT_NULL]
  }
};
const ITemplate = {
  fields: {
    template_suffix : [TEXT],
  }
};

module.exports={
  schema : [
    Persons = {
      Persons : {
        fields : {
          first_name : [TEXT, NOT_NULL],
          last_name : [TEXT, NOT_NULL],
          phone : [TEXT],
          email : [TEXT],
        },
      }
    },

    Roles = {
      Roles : {
        extends : [IName],
      }
    },

    Users ={
      Users :{
        fields : {
          username : [TEXT, NOT_NULL],
          password : [TEXT, NOT_NULL],
        },
        belongs_to : [Persons],
        associate_to : [Roles],
      }
    },
  ],
  samples : [
    [Roles,       [{id: 1, name: 'staff'}]],
    [Persons,     [{id: 1, first_name: 'John', last_name: 'Doe'}]],
    [Users,       [{id: 1 ,person_id: 1, role_id: 1, username: 'admin', password: '#482b60801c7d2e841175a68e256746b0340f4d50764059c3ce2a458cc19474dd91931c737bafeeddc1cc7f98e71b9f8002e8c8ffa96ceccf1ed40d95df557aab'}]],
  ]
};
