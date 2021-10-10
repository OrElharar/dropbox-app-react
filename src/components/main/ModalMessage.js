import React, { useState } from "react";

const ModalMessage = (props) => {
    return (


        <div className="backdrop">
            <div className="modal" id="modal">
                <h1 className="modal__title">{props.message}</h1>
                <div className="modal__actions">
                    <p className="error-message"></p>
                    <button className="modal__action modal__action--negative" type="button"
                        onClick={() => props.setModalMessage("")}>Back</button>
                </div>
            </div>

        </div>

    )
}

export default ModalMessage;