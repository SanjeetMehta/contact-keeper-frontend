import React, {useReducer} from "react";
import * as uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from "../types";

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Sanjeet",
                email: "sanjeet@testmail.com",
                phone: "222-222-222",
                type: "personal"
            },
            {
                id: 2,
                name: "San",
                email: "san@testmail.com",
                phone: "222-222-222",
                type: "professional"
            },
            {
                id: 3,
                name: "Sam",
                email: "sam@testmail.com",
                phone: "222-222-222",
                type: "personal"
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add contacts

    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({type: ADD_CONTACT, payload: contact});
    };

    // Delete contact

    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id});
    };
    // Set current contact

    // Clear current contact

    // Update contact

    // Filter contacts

    // Clear contact

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact,
                deleteContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
