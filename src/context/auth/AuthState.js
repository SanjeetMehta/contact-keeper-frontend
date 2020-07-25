import React, {useReducer} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
    REGISTER_SUCCESS,
    REGISTER_FAILL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    REGISTER_FAIL,
    LOGIN_SUCCESS
} from "../types";
const BASE_URL = "http://localhost:8083";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get(`${BASE_URL}/api/v1/auth`);
            dispatch({type: USER_LOADED, payload: res.data});
        } catch (err) {
            dispatch({type: AUTH_ERROR});
        }
    };

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const res = await axios.post(
                `${BASE_URL}/api/v1/users`,
                formData,
                config
            );
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
            loadUser();
        } catch (err) {
            dispatch({type: REGISTER_FAIL, payload: err.response.data.message});
        }
    };
    // Login User

    const login = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const res = await axios.post(
                `${BASE_URL}/api/v1/auth`,
                formData,
                config
            );
            dispatch({type: LOGIN_SUCCESS, payload: res.data});
            loadUser();
        } catch (err) {
            dispatch({type: LOGIN_FAIL, payload: err.response.data.message});
        }
    };
    // Logout User
    const logout = () => dispatch({type: LOGOUT});
    // Clear Errors
    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS});
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                user: state.user,
                register,
                clearErrors,
                loadUser,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
