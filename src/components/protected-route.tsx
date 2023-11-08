import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../services/reducers/userReducer";
import { RootState, AppDispatch } from "../services/reducers";

type TRoute = {
  element: JSX.Element;
};
export const ProtectedRouteElement = ({
  element,
}: TRoute): JSX.Element | null => {
  let { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const navigate = useNavigate();
  const init = async () => {
    dispatch(getUser())
      .unwrap()
      .then(() => setUserLoaded(true))
      .catch(() => {
        return navigate("/login", { replace: true, state: { from: location } });
      });
  };
  useEffect(() => {
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  if (userData) {
    return element;
  } else {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
};
