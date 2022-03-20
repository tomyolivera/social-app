const connection = require("../database");

const PublicationLike = function(user_id, publication_id){
    this.user_id = user_id;
    this.publication_id = publication_id;
}

PublicationLike.findAll = result => {
    const query = `
        SELECT * 
        FROM publication_likes
    `;

    connection.query(query, (err, res) => {
        if (err)
          return result(null, err);

        result(null, res);
    });
}

PublicationLike.findByUserId = (user_id, publication_id, result) => {
    const query = `
        SELECT *
        FROM publication_likes
        WHERE user_id = ? AND publication_id = ?
    `

    connection.query(query, [user_id, publication_id], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

PublicationLike.create = (pub_like, result) => {
    connection.query(`INSERT INTO publication_likes SET ?`, [pub_like], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

PublicationLike.delete = (user_id, publication_id, result) => {
    connection.query(`DELETE FROM publication_likes WHERE user_id = ? AND publication_id = ?`, [user_id, publication_id], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

module.exports = PublicationLike;