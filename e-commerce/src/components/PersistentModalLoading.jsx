import React from 'react'
import Modal from 'react-bootstrap/Modal';

export default function PersistentModalLoading(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className='text-center'>
          <b>{props.message}</b>
        </Modal.Body>
      </Modal>
    </>
  )
}
