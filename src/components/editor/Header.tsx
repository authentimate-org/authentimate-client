import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as htmlToImage from "html-to-image";
import toast from "react-hot-toast";
import { useUpdateUserDesignMutation } from "../../api/project/projectApi";
import { setComponents } from "../../services/project/projectSlice";
import { Loader } from "lucide-react";

interface HeaderProps {
  components: any;
  design_id: string;
  projectId:string;
  showNextButton?: boolean;
  onNextClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({  components, 
  projectId, 
  design_id, 
  showNextButton = false, 
  onNextClick  }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [updateUserDesign] = useUpdateUserDesignMutation(); 

  const saveImage = async () => {
    const getDiv = document.getElementById("main_design");
    if (getDiv) {
      const image = await htmlToImage.toBlob(getDiv);

      if (image) {
        const obj = {
          design: components,
        };

        // console.log(obj);
        const design = new FormData();
        design.append("design", JSON.stringify(obj));
        design.append("projectId", projectId);
        console.log("obj :- ser",obj)
        try {
          setLoader(true);
          console.log("dessign", design_id);
          const { data } = await updateUserDesign({ design });
          toast.success(data.message);
          setLoader(false);

          dispatch(setComponents(components));
        } catch (error: any) {
          setLoader(false);
          toast.error(error.response.data.message);
        }
      }
    }
  };

  // const downloadImage = async () => {
  //   const getDiv = document.getElementById("main_design");
  //   if (getDiv) {
  //     const dataUrl = await htmlToImage.toPng(getDiv, {
  //       style: {
  //         transform: "scale(1)",
  //       },
  //     });

  //     const link = document.createElement("a");
  //     link.download = "image";
  //     link.href = dataUrl;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // };

  return (
    <div className="h-[60px] bg-gradient-to-r from-[#9494a1] via-[#7a8091] to-[#606a74] w-full">
      <div className="flex justify-between px-10 items-center text-gray-300 h-full">
        {/* <Link to="/">
          <img
            src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg"
            alt="AutiMate"
          />
        </Link> */}
        <span className="text-xl" style={{ color: "white" }}>
          AuthentiMate
        </span>
        <div className="flex justify-center items-center gap-2 text-gray-300">
          <button
            disabled={loader}
            onClick={saveImage}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            {loader ? <Loader/> : "Save"}
          </button>
          {/* <button
            onClick={downloadImage}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            Download
          </button> */}
          {showNextButton && (
            <button
              onClick={onNextClick}
              className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
