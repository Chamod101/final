import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const DeleteConfirmathion = (props) => {
    return (

        <div>

            <Modal show={props.showModal} onHide={() => { props.closeConfirm() }}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { props.closeConfirm() }}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { props.deleteRecordHandler() }}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    );
}