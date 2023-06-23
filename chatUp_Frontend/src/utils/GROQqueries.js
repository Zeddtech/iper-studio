export const categories = [
  {
    name: "cars",
    image:
      "https://i.ipeimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg",
  },
  {
    name: "fitness",
    image:
      "https://i.ipeimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg",
  },
  {
    name: "wallpaper",
    image:
      "https://i.ipeimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg",
  },
  {
    name: "websites",
    image:
      "https://i.ipeimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg",
  },
  {
    name: "photo",
    image:
      "https://i.ipeimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg",
  },
  {
    name: "food",
    image:
      "https://i.ipeimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg",
  },
  {
    name: "nature",
    image:
      "https://i.ipeimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg",
  },
  {
    name: "art",
    image:
      "https://i.ipeimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg",
  },
  {
    name: "travel",
    image:
      "https://i.ipeimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg",
  },
  {
    name: "quotes",
    image:
      "https://i.ipeimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg",
  },
  {
    name: "cats",
    image:
      "https://i.ipeimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg",
  },
  {
    name: "dogs",
    image:
      "https://i.ipeimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg",
  },
  {
    name: "others",
    image:
      "https://i.ipeimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg",
  },
];

export function userQuery(id) {
  const query = `*[_type=='user'&& _id=='${id}']`;
  return query;
}

export function searchQuery(searchTerm) {
  const query = `*[_type=="ipe" && title match "${searchTerm}*"|| category match "${searchTerm}*"||about match "${searchTerm}*"]{
    _id,
    image,
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

export const allFeedQuery = `*[_type=='ipe']|order(_createdAt desc){
  _id,
    image,
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

export const ipeDetailQuery = ipeId => {
  const query = `*[
  _type == "ipe" &&
  _id == '${ipeId}'
][0]{
  about,
  category,
  destination,
  title,
  userid,
  _id,
  _createdAt,
  image,
  postedBy->{
    _id,
    image,
    firstName,
    lastName
  },
  "savedBy": save[]{
    _key,
    savedBy->{
      _id,
      image,
      firstName,
      lastName
    }
  },
  comments[]{
    _key,
    comment,
    date,
    postedBy->{
      _id,
      image,
      firstName,
      lastName
    }
  }
}
`;
  return query;
};
export const similarIpeCategoryQuery = (ipeId, ipeCategory) => {
  const query = `*[
  _type == 'ipe' &&
  _id != '${ipeId}' &&
  category == '${ipeCategory}'
]{
   _id,
    image,
    destination,
    postedBy->{
      _id,
      image,
      firstName,
      lastName
    },
    "savedBy": save[]{
    _id,
    savedBy->{
      _id,
      image,
      firstName,
      lastName,
    },
    
  },
}`;
  return query;
};

export const userCreatedIpesQuery = userId => {
  const query = `*[ _type == 'ipe' && userid == '${userId}'] | order(_createdAt desc){
    image,
    _id,
    destination,
    postedBy->{
      _id,
      firstName,
      lastName,
      image
    },
    "savedBy": save[]{
    _id,
    savedBy->{
      _id,
      image,
      firstName,
      lastName,
    },
  }}`;
  return query;
};
export const userSavedIpesQuery = userId => {
  const query = `*[_type == 'ipe' && '${userId}' in save[].userid ] | order(_createdAt desc) {
    image,
    _id,
    destination,
    postedBy->{
      _id,
      firstName,
      lastName,
      image
    },
    "savedBy": save[]{
    _id,
    savedBy->{
      _id,
      image,
      firstName,
      lastName,
    },
  }}`;
  return query;
};
export const userActivityQuery = userId => {
  const query = `{
  "savedCount":count(*[_type == 'ipe' && '${userId}' in save[].userid ]),
    "createdCount":count(*[_type=='ipe' && userid=='${userId}']),
    "savesGotten":*[_type=='ipe' && userid=='${userId}' && defined(save)]{
      "size":count(save)         
    },
                  
}`;
  return query;
};
// _id == "ca870f7f-acb1-4014-8325-2ffa499ab956";
// "104727233770123461088";
