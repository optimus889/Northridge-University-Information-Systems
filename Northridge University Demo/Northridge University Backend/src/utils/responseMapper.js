export function stripMongoFields(document) {
  if (!document) return null;
  const obj = typeof document.toObject === "function" ? document.toObject() : { ...document };
  delete obj._id;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  if (obj.publicId) {
    obj.id = obj.publicId;
    delete obj.publicId;
  }
  return obj;
}

export function stripMany(documents) {
  return documents.map(stripMongoFields);
}

export function userToFrontend(user) {
  return {
    id: user.publicId,
    username: user.username,
    name: user.name,
    role: user.role,
    department: user.department,
    email: user.email
  };
}
