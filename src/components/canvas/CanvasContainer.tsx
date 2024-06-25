import React, { useCallback, useRef, useState } from "react";
import CanvasComponent from "./CanvasComponent";
import Toolbar from "./Toolbar";
import TextFormattingToolbar from "./TextFormatingToolbar";
export const CanvasContext = React.createContext<ICanvasContext>({});

export interface ICanvasData {
  component?: string;
  id?: string;
  position?: { top: number; left: number };
  dimension?: { width: string; height: string };
  content?: string;
  type: string;
}

export interface ICanvasComponent {
  position?: { top: number; left: number };
  dimension?: { width: string; height: string };
  content?: string;
  id?: string;
  type: string;
  isReadOnly?: boolean;
}

export interface ICanvasContext {
  state?: {
    canvasData: ICanvasData[];
    activeSelection: Set<string>;
    enableQuillToolbar: boolean;
    backgroundColor: string;
  };
  actions?: {
    setCanvasData: React.Dispatch<React.SetStateAction<ICanvasData[]>>;
    setActiveSelection: React.Dispatch<React.SetStateAction<Set<string>>>;
    updateCanvasData: (data: Partial<ICanvasComponent>) => void;
    addElement: (type: string) => void;
    setEnableQuillToolbar: (state: boolean) => void;
    setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  };
}

const getInitialData = (data: ICanvasData[], type: string = "TEXT"): ICanvasData => {
  return {
    type: type,
    id: `${type}__${Date.now()}__${data.length}`,
    position: {
      top: 100,
      left: 100,
    },
    dimension: {
      width: "150",
      height: type === "TEXT" ? "50" : "150",
    },
    content: type === "TEXT" ? "Sample Text" : "",
  };
};

const CanvasContainer = () => {
  const [canvasData, setCanvasData] = useState<ICanvasData[]>([]);
  const [activeSelection, setActiveSelection] = useState<Set<string>>(new Set());
  const [enableQuillToolbar, setEnableQuillToolbar] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

//   const containerRef = useRef<HTMLDivElement>(null);
  const isSelectAll = useRef<boolean>(false);

  const updateCanvasData = (data: Partial<ICanvasComponent>) => {
    const currentDataIndex = canvasData.findIndex((canvas) => canvas.id === data.id) ?? -1;
    if (currentDataIndex !== -1) {
      const updatedData = { ...canvasData[currentDataIndex], ...data };
      canvasData.splice(currentDataIndex, 1, updatedData);
      setCanvasData([...(canvasData || [])]);
    }
  };

  const addElement = (type: string) => {
    const defaultData = getInitialData(canvasData, type);
    setCanvasData([...canvasData, { ...defaultData, type: type ?? "TEXT" }]);
    activeSelection.clear();
    activeSelection.add(defaultData.id!);
    setActiveSelection(new Set(activeSelection));
  };

  const deleteElement = useCallback(() => {
    setCanvasData([
      ...canvasData.filter((data) => {
        if (data.id && activeSelection.has(data.id)) {
          activeSelection.delete(data.id);
          return false;
        }
        return true;
      }),
    ]);
    setActiveSelection(new Set(activeSelection));
  }, [activeSelection, canvasData]);

  const selectAllElement = useCallback(() => {
    isSelectAll.current = true;
    canvasData.forEach((data) => activeSelection.add(data.id || ""));
    setActiveSelection(new Set(activeSelection));
  }, [activeSelection, canvasData]);

  const context: ICanvasContext = {
    actions: {
      setCanvasData,
      setActiveSelection,
      updateCanvasData,
      addElement,
      setEnableQuillToolbar,
      setBackgroundColor,

    },
    state: {
      canvasData,
      activeSelection,
      enableQuillToolbar,
      backgroundColor,
    },
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        deleteElement();
      } else if (["a", "A"].includes(event.key) && event.ctrlKey) {
        event.preventDefault();
        selectAllElement();
      }
    },
    [deleteElement, selectAllElement]
  );

  const outSideClickHandler = () => {
    isSelectAll.current = false;
    setActiveSelection(new Set());
  };

  const handleMouseDown = useCallback(() => {
    if (!isSelectAll.current) {
      return;
    }

    outSideClickHandler();
    isSelectAll.current = false;
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleKeyDown, handleMouseDown]);

 
  return (
    <div className="canvas-container-wrapper">
      <CanvasContext.Provider value={context}>
        <div className="left-toolbar">
          <Toolbar isEditEnable={enableQuillToolbar} />
        </div>
        <div className="canvas-content">
          {enableQuillToolbar && (
            <div className="top-toolbar">
              <TextFormattingToolbar />
            </div>
          )}
          <div 
            className="canvas-area" 
            style={{
              width: '1124px',
              height: '794px',
              backgroundColor: backgroundColor,
              position: 'relative',
              margin: 'auto'
            }}
          >
            {canvasData.map((canvas) => (
              <CanvasComponent key={canvas.id} {...canvas} />
            ))}
          </div>
        </div>
      </CanvasContext.Provider>
    </div>
  );
};

export default CanvasContainer;