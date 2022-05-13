const config = {
    production : {
        SECRET : process.env.SECRET,
        DATABASE : process.env.MONGODB_URI
    },
    default : {
        SECRET : "GIGFORCE",
        // Please modify the url of database in case you are testing on your device
        DATABASE : "mongodb://localhost:27017/gigforce-task-db"
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}