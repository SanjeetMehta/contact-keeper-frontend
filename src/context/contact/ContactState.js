import React, {useReducer} from "react";
import * as uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from "../types";
const BASE_URL = "http://localhost:8083";

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add contacts

    const addContact = async contact => {
        const config = {
            heders: {
                "Content-Type": "application/json"
            }
        };

        try {
            const res = await axios.post(
                `${BASE_URL}/api/v1/contacts`,
                contact,
                config
            );
            dispatch({type: ADD_CONTACT, payload: res.data});
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.message});
        }
    };

    // Delete contact

    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id});
    };
    // Set current contact

    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    };

    // Clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    };

    // Update contact

    const updateContact = contact => {
        dispatch({type: UPDATE_CONTACT, payload: contact});
    };

    // Filter contacts

    const filterContacts = text => {
        dispatch({type: FILTER_CONTACTS, payload: text});
    };

    // Clear contact

    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
