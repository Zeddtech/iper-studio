export function userQuery(id) {
  const query = `*[_type=='user'&& _id=='${id}']`;
  return query;
}

export function searchQuery(searchTerm) {
  const query = `*[_type=="pin" && title match "${searchTerm}*"|| category match "${searchTerm}*"||about match "${searchTerm}*"]{
    _id,
    "imageUrl":image.asset->url,
    destination,
    postedBy->{
      _id,
      image,
       firstName,
      lastName
    },
    "savedBy": save[]{
    key,
   savedBy->{
      _id,
      image,
       firstName,
      lastName
    },
    
  },
  }`;
  return query;
}

export const allFeedQuery = `*[_type=='pin']|order(_createdAt desc){
  _id,
    "imageUrl":image.asset->url,
    destination,
    postedBy->{
      _id,
      image,
      firstName,
      lastName
    },
    "savedBy": save[]{
    key,
    savedBy->{
      _id,
      image,
      firstName,
      lastName,
    },
    
  },
}`;
