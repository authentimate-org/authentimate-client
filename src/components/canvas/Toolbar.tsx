import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { addText } from "@/services/canvas/canvasSlice";

const Toolbar = () => {
  const dispatch = useDispatch();
  const handleAddText = () => {
    const newText = {
      content: "New Text",
      color: "#c10202",
      fontStyle: "normal" as "normal", 
      size: 20,
    };
    dispatch(addText(newText));
  };
  return (
    <div className="h-auto bg-slate-200 w-64">
      <Button onClick={handleAddText}>Add Text</Button>
    </div>
  );
};

export default Toolbar;