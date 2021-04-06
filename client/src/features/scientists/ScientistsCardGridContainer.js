import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectAllScientists, fetchScientists } from "./scientistsSlice";
import ScientistsCardGrid from "./ScientistsCardGrid";

export default function ScientistsCardGridContainer() {
  const dispatch = useDispatch();
  const scientists = useSelector(selectAllScientists);
  const scientistsStatus = useSelector((state) => state.scientists.status);
  const error = useSelector((state) => state.scientists.error);

  useEffect(() => {
    if (scientistsStatus === "idle") {
      dispatch(fetchScientists());
    }
  }, [scientistsStatus, dispatch]);

  let content;

  if (scientistsStatus === "loading") {
    content = <div className="text-center mt-32 text-3xl">Loading...</div>;
  } else if (scientistsStatus === "succeeded") {
    content = <ScientistsCardGrid scientists={scientists} />;
  } else if (scientistsStatus === "failed") {
    content = <div>{error}</div>;
  }
  return <div>{content}</div>;
}
