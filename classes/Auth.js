const crypto = require('crypto');

class Auth{
  static logout(){
    Auth.session.admin_logged_in = false;
    Auth.session.user_id = null;
    Auth.session.role_id = null;
    Auth.session.user_full_name = null;
    Auth.session.user_role = null;
  }

  static authorize(username, password, db, salt=""){
    //digest password hash.
    const hash = crypto.createHash('sha512');
    hash.update(username + password + salt);
    const hashPassword = '#' + hash.digest('hex');
    const user = db.prepare('SELECT id, person_id, role_id from users WHERE username = ? AND password = ?').get(username, hashPassword);
    if(user){
      Auth.session.user_id = user.id;
      Auth.session.role_id = user.role_id;
      Auth.session.admin_logged_in = true;

      const person = db.prepare('SELECT * FROM persons WHERE id = ?').get(user.person_id);
      Auth.session.user_full_name = `${person.first_name} ${person.last_name}`;

      const role   = db.prepare('SELECT * FROM roles WHERE id = ?').get(user.role_id);
      Auth.session.user_role = role.name;
    }

    return user;
  }
}

Auth.session = null;

module.exports = Auth;
