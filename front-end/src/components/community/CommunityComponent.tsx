import { useEffect } from "react";
import { CommunityLayout } from "./CommunityLayout";
import { useLocation } from "react-router-dom";

export const CommunityComponent = () => {
  const location = useLocation();
  let category = "";

  if (location.pathname.startsWith("/community/")) {
    category = location.pathname.replace("/community/", "");
  }
  // useEffect(() => {
  //   fetch(`http://localhost:3000/posts/categories/${category}`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error("Error fetching posts:", error));
  // }, [category]);

  return (
    <>
      <CommunityLayout>dfggegefw</CommunityLayout>
    </>
  );
};
