// import React, { useState } from 'react';
// import Image from './Image';
// import { useFetchBackgroundImagesQuery } from '../../api/project/projectApi';

// interface BackgroundImagesProps {
//   setImage: (imageUrl: string) => void;
//   type: string;
// }

// interface ImageData {
//   image_url: string;
// }

// const BackgroundImages: React.FC<BackgroundImagesProps> = ({ setImage, type }) => {
//   const { data: fetchedImages = [], error } = useFetchBackgroundImagesQuery();
//   const [images, setImages] = useState<ImageData[]>(fetchedImages);

//   const add_image = (url: string) => {
//     const newImage = { image_url: url };
//     setImages([...images, newImage]);
//   };

//   if (error) {
//     console.log(error);
//     return <div>Error loading images</div>;
//   }

//   return <Image setImage={setImage} type={type} images={images} add_image={add_image} />;
// };

// export default BackgroundImages;
