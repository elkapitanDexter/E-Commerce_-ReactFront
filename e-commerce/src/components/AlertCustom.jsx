import React from 'react'
import Alert from 'react-bootstrap/Alert';

export default function AlertCustom(props) {
  return (
    <>
        <Alert className={`${props.lightmode === "true" ? 'customDangerV2' : 'customDanger'}`} onClose={() => props.setAlertState(false)} dismissible style={{ fontSize:'13px' }}>
            <Alert.Heading className='cstAlertHeading'><b>ERROR</b></Alert.Heading>
            <p style={{ whiteSpace: 'pre-line' }}>{props.alertMessage}</p>
        </Alert>
    </>
  )
}
