import React from 'react'
import Alert from 'react-bootstrap/Alert';

export default function AlertCustom(props) {
  return (
    <>
        <Alert variant={props.alertOption} onClose={() => props.setAlertState(false)} dismissible style={{ fontSize:'13px' }}>
            <Alert.Heading style={{ fontSize:'16px' }}><b>Error</b></Alert.Heading>
            <p>{props.alertMessage}</p>
        </Alert>
    </>
  )
}
