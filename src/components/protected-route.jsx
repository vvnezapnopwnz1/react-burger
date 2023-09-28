import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../services/reducers/userReducer";
import { refreshToken } from "../utils/burger-api";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element }) => {
  let { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = async () => {
    return await refreshToken();
  };
  useEffect(() => {
    if (!userData && localStorage.getItem("refreshToken")) {
      refresh()
        .then((data) => {
          localStorage.setItem("refreshToken", data.refreshToken);
          dispatch(getUser(data.accessToken));
        })
        .catch(() => {
          localStorage.removeItem("refreshToken");
          navigate("/login");
        });
    } else if (!userData && !localStorage.getItem("refreshToken")) {
      navigate("/login");
    }
  }, [dispatch, element, navigate, userData]);
  if (userData) return element;
};
ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};
