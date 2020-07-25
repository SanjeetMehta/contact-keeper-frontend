import axios from "axios";
import React, {useReducer} from "react";
import {
    ADD_CONTACT,
    CLEAR_CONTACTS,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    DELETE_CONTACT,
    FILTER_CONTACTS,
    GET_CONTACTS,
    SET_CURRENT,
    UPDATE_CONTACT
} from "../types";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
const BASE_URL = "http://localhost:8083";

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts

    const getContacts = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/contacts`);
            dispatch({type: GET_CONTACTS, payload: res.data});
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.message});
        }
    };

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

    // Update contact

    const updateContact = async contact => {
        const config = {
            heders: {
                "Content-Type": "application/json"
            }
        };
        const contactId = contact._id;
        delete contact.date;
        delete contact._id;
        delete contact.user;
        delete contact.__v;
        try {
            const res = await axios.put(
                `${BASE_URL}/api/v1/contacts/${contactId}`,
                contact,
                config
            );
            dispatch({type: UPDATE_CONTACT, payload: res.data});
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.message});
        }
    };
    // Delete contact

    const deleteContact = async id => {
        try {
            const res = await axios.delete(`${BASE_URL}/api/v1/contacts/${id}`);
            dispatch({type: DELETE_CONTACT, payload: id});
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.message});
        }
    };

    // Clear contacts

    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACTS});
    };
    // Set current contact

    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    };

    // Clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
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
                getContacts,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
