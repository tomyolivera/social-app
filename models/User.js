const connection = require("../database");

const User = function(username, email, name, password, description, photo, is_banned, is_enabled, dark_mode, status){
    this.username = username;
    this.email = email;
    this.name = name;
    this.password = password;
    this.description = description;
    this.photo = photo;
    this.is_banned = is_banned;
    this.is_enabled = is_enabled;
    this.dark_mode = dark_mode;
    this.status = status;
}

// SELECT u.id, u.username, u.email, u.name, u.status, u.description, u.is_private, u.is_banned, u.is_enabled, u.dark_mode, u.created_at, u.updated_at, u.photo, COUNT(DISTINCT p.id) AS cant_publications,
// GROUP_CONCAT(DISTINCT uf.user_id_following) AS followers,
// GROUP_CONCAT(DISTINCT uf2.user_id_followed) AS following,
// GROUP_CONCAT(DISTINCT uf.user_id_following, uf.is_accepted) AS accepted,
// COUNT(DISTINCT uf.id) AS cant_followers,
// COUNT(DISTINCT uf2.id) AS cant_following,
// GROUP_CONCAT(DISTINCT r.name) AS roles,
// GROUP_CONCAT(DISTINCT pe.name) AS permissions
// FROM users u
// LEFT JOIN user_following uf ON uf.user_id_followed = u.id
// LEFT JOIN user_following uf2 ON uf2.user_id_following = u.id
// LEFT JOIN publications p ON p.user_id = u.id
// LEFT JOIN user_roles ur ON ur.user_id = u.id
// LEFT JOIN roles r ON r.id = ur.role_id
// LEFT JOIN user_permissions up ON up.user_id = u.id
// LEFT JOIN permissions pe ON pe.id = up.permission_id
// GROUP BY u.id

User.findAll = result => {
    connection.query("SELECT * FROM user_info", (err, res) => {
        if (err)
          return result(null, err);

        result(null, res);
    });
}

User.findById = (id, result) => {
    connection.query("SELECT * FROM user_info HAVING id = ?", [id], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

User.findByUsername = (username, result) => {
    connection.query(`SELECT * FROM user_info HAVING username LIKE '%${username}%'`, (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

User.findLoginByUsername = (username, result) => {
    connection.query("SELECT id, username, password FROM users WHERE username = ?", [username], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

User.create = (user, result) => {
    connection.query(`INSERT INTO users SET ?`, [user], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

User.update = (id, user, result) => {
    connection.query(`UPDATE users SET ? WHERE id = ?`, [user, id], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

User.delete = (id, result) => {
    connection.query(`DELETE FROM users WHERE id = ?`, [id], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

User.deleteAll = result => {
    connection.query(`DELETE FROM users`, (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

module.exports = User;