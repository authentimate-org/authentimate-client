import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Create: FC = () => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate("/create-project");
  };

  return (
    <div className="flex justify-left items-center ml-8">
      <div className="bg-white rounded-3xl shadow-lg w-[263px] h-[190px] flex items-center justify-center">
        <div className="inline-flex flex-col items-center justify-center cursor-pointer" >
          <div onClick={handleCreateProject} className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-gray-50 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:focus:ring-gray-300">
            <PlusIcon className="h-6 w-6" />
          </div>
          <div className="mt-2 text-sm font-medium">Create New Project</div>
        </div>
      </div>
    </div>
  );
};
export const PlusIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
};
export default Create;
