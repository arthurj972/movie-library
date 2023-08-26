/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ReactElement } from 'react';
import { Alert } from '@mui/material';

const ErrorMessage = (props: any): ReactElement => {
  const message = props.message;
  if (message) {
    return <Alert severity="error" style={{
      marginTop: 10,
      marginBottom: 10
    }}>{message}</Alert>;
  }
  return <></>
}

export default ErrorMessage;
