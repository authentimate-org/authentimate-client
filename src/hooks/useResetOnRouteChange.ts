// src/hooks/useResetOnRouteChange.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetProjectState } from "../services/project/projectSlice";

const useResetOnRouteChange = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetProjectState());
  }, [location, dispatch]);
};

export default useResetOnRouteChange;
