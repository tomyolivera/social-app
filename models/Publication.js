const connection = require("../database");

const Publication = function(user_id, description, photo){
    this.user_id = user_id;
    this.description = description;
    this.photo = photo;
}

// SELECT p.*, u.username, u.photo AS user_photo, COUNT(pl.publication_id) AS cant_likes, GROUP_CONCAT(pl.user_id) AS users_liked
// FROM publications p
// LEFT JOIN users u ON u.id = p.user_id
// LEFT JOIN publication_likes pl ON pl.publication_id = p.id
// GROUP BY p.id
// HAVING ? = ?
// ORDER BY p.created_at DESC

Publication.findAll = result => {
    connection.query(`SELECT * FROM publication_info ORDER BY created_at DESC`, (err, res) => {
        if (err)
          return result(null, err);

        result(null, res);
    });
}

Publication.findById = (id, result) => {
    connection.query(`SELECT * FROM publication_info HAVING id = ?`, [id], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

Publication.findByUser = (user_id, result) => {
    connection.query(`SELECT * FROM publication_info HAVING user_id = ? ORDER BY created_at DESC`, [user_id], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

Publication.create = (publication, result) => {
    connection.query(`INSERT INTO publications SET ?`, [publication], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

Publication.update = (id, publication, result) => {
    connection.query(`UPDATE publications SET ? WHERE id = ?`, [publication, id], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

Publication.delete = (id, result) => {
    connection.query(`DELETE FROM publications WHERE id = ?`, [id], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

Publication.deleteAll = result => {
    connection.query(`DELETE FROM publications`, (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

module.exports = Publication;