import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getItemFromLocalStorage } from "../utils";
import PageLoader from "../components/common/PageLoader";

const PublicLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItemFromLocalStorage("authToken");
    if (token) {
      navigate("/dashboard");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicLayout;
