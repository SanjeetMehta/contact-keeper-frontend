import React, {useReducer} from "react";
import * as uuid from "uuid";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";

import {
    REGISTER_SUCCESS,
    REGISTER_FAILL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESSS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    REGISTER_FAIL
} from "../types";

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

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const res = await axios.post(
                "http://localhost:8083/api/v1/users",
                formData,
                config
            );
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
        } catch (err) {
            dispatch({type: REGISTER_FAIL, payload: err.response.data.message});
        }
    };
    // Login User

    // Logout User

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
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
