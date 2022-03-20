const connection = require("../database");

const UserFollowing = function(user_id_following, user_id_followed, created_at){
    this.user_id_following = user_id_following;
    this.user_id_followed = user_id_followed;
    this.created_at = created_at;
}

UserFollowing.findByIds = (user_id_following, user_id_followed, result) => {
    connection.query("SELECT * FROM user_following WHERE user_id_following = ? AND user_id_followed = ?", [user_id_following, user_id_followed], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

UserFollowing.create = (data, result) => {
    connection.query(`INSERT INTO user_following SET ?`, [data], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

UserFollowing.delete = (user_id_following, user_id_followed, result) => {
    connection.query(`DELETE FROM user_following WHERE user_id_following = ? AND user_id_followed = ?`, [user_id_following, user_id_followed], (err, res) => {
        if(err)
            return result(null, err);
        
        result(null, res);
    });
}

module.exports = UserFollowing;