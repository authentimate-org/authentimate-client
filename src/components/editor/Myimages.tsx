import React, { useEffect, useState } from "react";
import Image from "./Image";
import { useFetchGetUserImageQuery, useFetchAddUserImageMutation } from '../../api/project/projectApi';
import BarLoader from "react-spinners/BarLoader";
import toast from "react-hot-toast";

interface MyImagesProps {
  add_image: (image: any) => void;
}

interface UserImage {
  _id: string;
  image_url: string;
}

const MyImages: React.FC<MyImagesProps> = ({ add_image }) => {
  const [images, setImages] = useState<UserImage[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const { data, error: fetchError } = useFetchGetUserImageQuery();
  const [fetchAddUserImage] = useFetchAddUserImageMutation();

  const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      try {
        setLoader(true);
        const response = await fetchAddUserImage(formData).unwrap();
        console.log("Uploaded Image Data:", response); // Debug: Log the uploaded image data
        setImages((prevImages) => [...prevImages, response.data]);
        setLoader(false);
      } catch (error: any) {
        setLoader(false);
        toast.error(error.message || 'Error uploading image');
      }
    }
  };

  useEffect(() => {
    if (data) {
      console.log("Fetched Data:", data);
      setImages(data);
    } else if (fetchError) {
      console.error(fetchError);
    }
  }, [data, fetchError]);

  return (
    <div>
      <div className="w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3">
        <label className="text-center cursor-pointer" htmlFor="image">
          Upload image
        </label>
        <input
          readOnly={loader}
          onChange={imageUpload}
          type="file"
          id="image"
          className="hidden"
        />
      </div>
      {loader && (
        <div className="flex justify-center items-center mb-2">
          <BarLoader color="#fff" />
        </div>
      )}
      {images && images.length > 0 && (
        <div className="h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
          <Image add_image={add_image} images={images} />
        </div>
      )}
    </div>
  );
};

export default MyImages;
