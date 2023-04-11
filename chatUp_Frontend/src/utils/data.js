export function userQuery(id) {
  const query = `*[_type=='user'&& _id=='${id}']`;
  return query;
}

// export default userQuery;
