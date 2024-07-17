import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import toast from "react-hot-toast";
import { useUpdateUserDesignMutation } from "../../api/project/projectApi";
interface HeaderProps {
  components: any; 
  design_id: string;
}

const Header: React.FC<HeaderProps> = ({ components, design_id }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [updateUserDesign] = useUpdateUserDesignMutation(); // Using the mutation from your projectApi

  const saveImage = async () => {
    console.log(components)
    const getDiv = document.getElementById("main_design");
    if (getDiv) {
      const image = await htmlToImage.toBlob(getDiv);

      if (image) {
        const obj = {
          design: components
        };

        // console.log(obj);
        const design = new FormData();
        design.append("design", JSON.stringify(obj));
        // formData.append("image", image);
        try {
          setLoader(true);
          console.log("dessign",design_id)
          const { data } = await updateUserDesign({ design });
          toast.success(data.message);
          setLoader(false);
        } catch (error: any) {
          setLoader(false);
          toast.error(error.response.data.message);
        }
      }
    }
  };

  const downloadImage = async () => {
    const getDiv = document.getElementById("main_design");
    if (getDiv) {
      const dataUrl = await htmlToImage.toPng(getDiv, {
        style: {
          transform: "scale(1)",
        },
      });

      const link = document.createElement("a");
      link.download = "image";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="h-[60px] bg-gradient-to-r from-[#9494a1] via-[#7a8091] to-[#606a74] w-full">
      <div className="flex justify-between px-10 items-center text-gray-300 h-full">
        {/* <Link to="/">
          <img
            src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg"
            alt="AutiMate"
          />
        </Link> */}
        <span className="text-xl" style={{color:"white"}}>AuthentiMate</span>
        <div className="flex justify-center items-center gap-2 text-gray-300">
          <button
            disabled={loader}
            onClick={saveImage}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            {loader ? "Loading..." : "Save"}
          </button>
          <button
            onClick={downloadImage}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
