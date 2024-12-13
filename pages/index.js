import { useRouter } from "next/router";
import { useEffect } from "react";

const NavigateToBooks = () => {
  const router = useRouter();
  useEffect(()=>{
    handleNavigation();
  },[])

  const handleNavigation = () => {
    router.push("/book");
  };

  return (
    <div>Redirecting to books ....</div>
  );
};

export default NavigateToBooks;
