import { useState, useEffect } from "react";

const useFetchCategories = () => {
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { category_id: number; category: string }[]
  >([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/categories`);
      if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      setCategories([]);
      setError("데이터를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, error, refetch: fetchCategories };
};

export default useFetchCategories;
