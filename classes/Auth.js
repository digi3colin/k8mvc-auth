const crypto = require('crypto');
const K8     = require('k8mvc');
const ORM    = K8.require('ORM');

class Auth{
  static logout(){
    Auth.session.admin_logged_in = false;
    Auth.session.user_id = null;
    Auth.session.role_id = null;
    Auth.session.user_full_name = null;
    Auth.session.user_role = null;
  }

  static authorize(username, password){
    //digest password hash.
    const hash = crypto.createHash('sha512');
    hash.update(username + password + K8.config.salt);
    const hashPassword = '#' + hash.digest('hex');
    const user = ORM.prepare('SELECT id, person_id, role_id from users WHERE username = ? AND password = ?').get(username, hashPassword);
    if(user){
      Auth.session.user_id = user.id;
      Auth.session.role_id = user.role_id;
      Auth.session.admin_logged_in = true;

      const person = ORM.prepare('SELECT * FROM persons WHERE id = ?').get(user.person_id);
      Auth.session.user_full_name = `${person.first_name} ${person.last_name}`;

      const role   = ORM.prepare('SELECT * FROM roles WHERE id = ?').get(user.role_id);
      Auth.session.user_role = role.name;
    }

    return user;
  }
}

Auth.session = null;

module.exports = Auth;
