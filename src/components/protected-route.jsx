import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../services/reducers/userReducer";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element }) => {
  let { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};
