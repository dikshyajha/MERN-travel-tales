// import { Navigate, Route, Routes } from "react-router";
// import { getTokenFromLocalStorage } from "../utils/localstorage.helper";
// import { useDispatch, useSelector } from "react-redux";
// import { setToken } from "../store/modules/auth/action";

// export const AppRoutes = () => {
//     const token = useSelector((state) => state.tokenReducer.token);
//     console.log("Token is ", token);
//     const dispatch = useDispatch();
//     const isLoggedIn = getTokenFromLocalStorage();

//     if (isLoggedIn) {
//         dispatch(setToken(isLoggedIn));
//     }

//     return (
//         <Routes>
//             <Route
//                 path=""
//                 element={token == "" ? <SignIn /> : <Navigate to="/dashboard" />}
//             />
//             <Route
//                 path="/dashboard"
//                 element={!token == "" ? < Dashboard /> : <Navigate to="/signin" />}
//             />
//         </Routes>
//     );
// };
