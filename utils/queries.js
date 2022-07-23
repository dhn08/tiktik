export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
        _id,
         caption,
           video{
            asset->{
              _id,
              url
            }
          },
          userId,
          postedBy->{
            _id,
            name,
            image
          },
        likes,
        comments[]{
          comment,
          _key,
          postedBy->{
          _id,
          name,
          image
        },
        }
      }`;

  return query;
};
