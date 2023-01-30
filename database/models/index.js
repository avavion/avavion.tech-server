import User from "./User.js";
import Tag from "./Tag.js";
import Repository from "./Repository.js";
import RepositoryTags from "./RepositoryTags.js";

RepositoryTags.hasMany(Repository);
Repository.belongsTo(RepositoryTags);

RepositoryTags.hasMany(Tag);
Tag.belongsTo(RepositoryTags);

export { User, Tag, Repository, RepositoryTags };
