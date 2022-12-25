import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { IParameter } from "../types/parameters";

const initialState = {
  primary: "",
  secondary: [],
  tertiary: [],
};

const useSearchParameters = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const [modifiedParameters, setModifiedParameters] =
    useState<IParameter>(initialState);

  let primary = pathname.substring(1);

  useEffect(() => {
    primary = pathname.substring(1);
    let secondary = searchParams.get("secondary")?.split(",");
    const tertiary = searchParams
      .get("tertiary")
      ?.split(",")
      .map((item) => {
        const [value, key] = item.split(":");
        return { [key]: value };
      });

    setModifiedParameters({
      primary,
      secondary: secondary || [],
      tertiary: tertiary || [],
    });
  }, [searchParams]);

  return {
    modifiedParameters,
    searchParams,
    primary,
  };
};

export default useSearchParameters;