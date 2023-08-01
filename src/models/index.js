const Actor = require("./Actor");
const Movie = require("./Movie");
const Director = require("./Director");
const Genre = require("./Genre");

Movie.belongsToMany(Actor, { through: "MovieActor" });
Actor.belongsToMany(Movie, { through: "MovieActor" });

Movie.belongsToMany(Director, { through: "DirectorMovie" });
Director.belongsToMany(Movie, { through: "DirectorMovie" });

Movie.belongsToMany(Genre, { through: "GenreMovie" });
Genre.belongsToMany(Movie, { through: "GenreMovie" });
