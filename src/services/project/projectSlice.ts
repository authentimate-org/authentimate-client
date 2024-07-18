// src/store/projectSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ProjectStage {
  PROJECT_CREATED = "PROJECT_CREATED",
  TEMPLATE_SELECTED = "TEMPLATE_SELECTED",
  TEMPLATE_FINALISED = "TEMPLATE_FINALISED",
  ISSUED = "ISSUED",
}

interface ProjectState {
  projectId: string | null;
  template: string | null;
  stage: ProjectStage;
  projectName: string;
  category: string;
  isLoading: boolean;
  isError: boolean;
  components: any[];
}

const initialState: ProjectState = {
  projectId: null,
  template: null,
  stage: ProjectStage.PROJECT_CREATED,
  projectName: "",
  category: "",
  isLoading: false,
  isError: false,
  components: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectId(state, action: PayloadAction<string | null>) {
      state.projectId = action.payload;
    },
    setStage(state, action: PayloadAction<ProjectStage>) {
      state.stage = action.payload;
    },
    setTemplate(state, action: PayloadAction<string | null>) {
      state.template = action.payload;
    },
    resetProjectState(state) {
      state.projectId = null;
      state.template = null;
      state.stage = ProjectStage.PROJECT_CREATED;
      state.projectName = "";
      state.category = "";
      state.isLoading = false;
      state.isError = false;
      state.components = [];
    },
    setProjectName(state, action: PayloadAction<string>) {
      state.projectName = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setComponents(state, action: PayloadAction<any[]>) {
      state.components = action.payload;
    },
    clearComponents(state) {
      state.components = [];
    },
  },
});

export const {
  setProjectId,
  setTemplate,
  setProjectName,
  setCategory,
  setLoading,
  setError,
  setStage,
  resetProjectState,
  setComponents,
  clearComponents,
} = projectSlice.actions;
export default projectSlice.reducer;
