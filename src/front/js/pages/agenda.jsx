import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { InlineWidget } from "react-calendly";
const Agenda = () => {
    const {store, actions} = useContext(Context)
    const {calendly_name}  = useParams()
    return (
        <div>
            {store.currentUser && 
            <div>
            <h1>Agenda tu Reunión</h1>
            <InlineWidget url={`https://calendly.com/${calendly_name}`} prefill={{email: store.currentUser.email, name: store.currentUser.name}}/>
            </div>
            }
        </div>
    );
};
export default Agenda;