import { React, useState } from 'react'
import { useForm, Form } from './useForm';
import { Alert, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';

const initialValue = {
    name: '',
    phone: '',
    email: '',
    suggestion: ''
}

export default function Contact() {
    const { values, handleInputChange, handelForm, msgError, arrErrorMsg } = useForm(initialValue);
    const [isSend, setSend] = useState(false);
    const [isError, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await handelForm(values);
        if (result === 'send success') {
            setError(false)
        } else {
            setError(true)
        }
        setSend(true);
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSend(false);
    };

    return (
        <>
            <Form>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className='contact_title' variant='h5'>Contact Us</Typography>
                    </Grid>
                    <Grid className='contact_form' item xs={12}>
                        <TextField
                            error={msgError?.nameErr === arrErrorMsg[0] || msgError?.nameErr === arrErrorMsg[1]}
                            helperText={msgError?.nameErr ? msgError?.nameErr : ' '}
                            variant='outlined'
                            label="Name"
                            placeholder='Enter Your Name'
                            fullWidth
                            name='name'
                            value={values.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            error={msgError?.phoneErr === arrErrorMsg[2] || msgError?.phoneErr === arrErrorMsg[3] || msgError?.phoneErr === arrErrorMsg[4] || msgError?.phoneErr === arrErrorMsg[5]}
                            helperText={msgError?.phoneErr ? msgError?.phoneErr : ' '}
                            variant='outlined'
                            label="Phone Number"
                            placeholder='Enter Your Phone Number'
                            fullWidth
                            name='phone'
                            value={values.phone}
                            onChange={handleInputChange}
                        />
                        <TextField
                            error={msgError?.emailErr === arrErrorMsg[6] || msgError?.emailErr === arrErrorMsg[7]}
                            helperText={msgError?.emailErr ? msgError?.emailErr : ' '}
                            variant='outlined'
                            label="Email"
                            placeholder='Enter Your Email'
                            fullWidth
                            name='email'
                            value={values.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            error={msgError?.suggErr === arrErrorMsg[8]}
                            helperText={msgError?.suggErr ? msgError?.suggErr : ' '}
                            variant='outlined'
                            label='Suggestion'
                            placeholder='Enter Your Suggestion'
                            fullWidth
                            name='suggestion'
                            value={values.suggestion}
                            onChange={handleInputChange}
                            multiline
                            rows={5}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className='contact_btn' variant='contained' fullWidth onClick={handleSubmit}>Send</Button>
                    </Grid>
                </Grid>
            </Form>
            {(isSend && !isError) &&
                <Snackbar open={isSend} autoHideDuration={4000} onClose={handleClose}>
                    <Alert
                        severity="success"
                        variant="filled"
                        onClose={handleClose}
                    >
                        Send Successfully!
                    </Alert>
                </Snackbar>
            }
            {(isSend && isError) &&
                <Snackbar open={(isSend || isError)} autoHideDuration={4000} onClose={handleClose}>
                    <Alert
                        severity="error"
                        variant="filled"
                        onClose={handleClose}
                    >
                        Send Fail!
                    </Alert>
                </Snackbar>
            }
        </>
    )
}
