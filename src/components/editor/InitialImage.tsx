// import React, { useEffect } from 'react';
// import Image from './Image';
// import { useFetchIntialImagesQuery } from '../../api/project/projectApi';

// // interface ImageData {
// //   image_url: string;
// // }

// interface InitialImageProps {
//   add_image: (imageUrl: string) => void;
// }

// const InitialImage: React.FC<InitialImageProps> = ({ add_image }) => {
//   const { data, error, isLoading } = useFetchIntialImagesQuery();

//   useEffect(() => {
//     if (error) {
//       console.log(error);
//     }
//   }, [error]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return <Image add_image={add_image} images={data || []} />;
// };

// export default InitialImage;
