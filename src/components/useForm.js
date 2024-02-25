import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import { blue, grey, yellow } from "@mui/material/colors";
import axios from "axios";
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function useForm(initialValue) {
    const arrErrorMsg = [
        'Please input your name',
        'Name must be String and cannot have special character',
        'Please input your phone number',
        'The phone number must have between 10 to 11 digits.',
        'The phone number must start with the digit 0.',
        'The phone number must be digits',
        'Email must not be empty',
        'Email must has "@gmail.com" format',
        'Please input your suggestion',
    ]
    const [msgError, setMsgError] = useState(
        {
            nameErr: '',
            phoneErr: '',
            emailErr: '',
            suggErr: ''
        }
    );
    const [values, setValues] = useState(initialValue);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }


    const addForm = async (form) => {
        try {
            const res = await axios.post('https://64e75fafb0fd9648b78fdde6.mockapi.io/formSuggestion', {
                name: form.name,
                phone: form.phone,
                email: form.email,
                suggestion: form.suggestion
            })
            return 'send success';
        } catch (error) {
            return error;
        }
    }
    const addFormWithMock = async (form) => {
        fetch('https://64e75fafb0fd9648b78fdde6.mockapi.io/formSuggestion', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // Send your data in the request body as JSON
            body: JSON.stringify(form)
        }).then(res => {
            if (res.ok) {
                return res.json('send success');
            }
            // handle error
        }).then(forms => {
            // do something with the new task
        }).catch(error => {
            return error;
        })
    }

    const deleForm = (id) => {
        const urlDele = 'https://64e75fafb0fd9648b78fdde6.mockapi.io/formSuggestion/' + id
        fetch(urlDele, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(film => {
            // Do something with deleted task
        }).catch(error => {
            console.log(error)
        })
    }

    async function handelForm(form) {
        let isError = false;
        const patternCheckEmpty = /^$/;
        const patternCheckName = /^([a-zA-Z]+)([a-zA-Z\s]+)([a-zA-Z]+)$/;
        const patternCheckPhone = /^0[0-9]{9,10}$/;
        const patternCountPhone = /^[0-9]{10,11}$/;
        const patternPhoneNotDigit = /^([0-9]+)?[\D]+$/
        const patternPhoneFirstDigit = /^0.+$/;
        const patternCheckEmail = /^\w+([\.-]?\w+)*@gmail.com$/; // \w cho cả số và chữ, ngoại trừ các kí tự đặc biệt và các dấu câu(\w bao gồm dấu gạch chân "_")
        if (patternCheckEmpty.test(form.name)) { //Empty name
            setMsgError((pre) => {
                return {
                    ...pre,
                    nameErr: arrErrorMsg[0],
                };
            })
            isError = true;
        } else if (!patternCheckName.test(form.name)) { //Name must be String and cannot have special character
            setMsgError((pre) => {
                return {
                    ...pre,
                    nameErr: arrErrorMsg[1],
                };
            })
            isError = true;
        } else {
            setMsgError((pre) => {
                return {
                    ...pre,
                    nameErr: '', //Không có lỗi phải trả về no error
                };
            })
        }
        if (patternCheckEmpty.test(form.phone)) { //Empty phone
            setMsgError((pre) => {
                return {
                    ...pre,
                    phoneErr: arrErrorMsg[2],
                };
            })
            isError = true;
        } else if (!patternCheckPhone.test(form.phone)) { //Nếu phone format sai thì check xem sai cái gì
            if (patternPhoneFirstDigit.test(form.phone)) { //Nếu số đầu tiên không phải 0 thì báo lỗi số đầu khác 0
                if (!patternCountPhone.test(form.phone)) {
                    if (patternPhoneNotDigit.test(form.phone)) { //Nếu có chữ thì quăng lỗi chữ
                        setMsgError((pre) => {
                            return {
                                ...pre,
                                phoneErr: arrErrorMsg[5], //Lỗi phone có chữ
                            };
                        })
                        isError = true;
                    } else {                                //Ngược lại sẽ là lỗi out range
                        setMsgError((pre) => {
                            return {
                                ...pre,
                                phoneErr: arrErrorMsg[3], //Lỗi out range
                            };
                        })
                        isError = true;
                    }
                }
            } else {
                setMsgError((pre) => {
                    return {
                        ...pre,
                        phoneErr: arrErrorMsg[4], //Lỗi số đầu khác 0
                    };
                })
                isError = true;
            }
        } else {
            setMsgError((pre) => {
                return {
                    ...pre,
                    phoneErr: '', //Không có lỗi phải trả về no error
                };
            })
        }
        if (patternCheckEmpty.test(form.email)) { //Email must not be empty
            setMsgError((pre) => {
                return {
                    ...pre,
                    emailErr: arrErrorMsg[6],
                };
            })
            isError = true;
        } else if (!patternCheckEmail.test(form.email)) { //Email must has "@gmail.com" format
            setMsgError((pre) => {
                return {
                    ...pre,
                    emailErr: arrErrorMsg[7],
                };
            })
            isError = true;
        } else {
            setMsgError((pre) => {
                return {
                    ...pre,
                    emailErr: '', //Không có lỗi phải trả về no error
                };
            })
        }
        if (patternCheckEmpty.test(form.suggestion)) { //Please input your suggestion
            setMsgError((pre) => {
                return {
                    ...pre,
                    suggErr: arrErrorMsg[8],
                };
            })
            isError = true;
        } else {
            setMsgError((pre) => {
                return {
                    ...pre,
                    suggErr: '', //Không có lỗi phải trả về no error
                };
            })
        }
        if (!isError) {
            const result = addForm(form); //Sau khi add xong thì trả form về rỗng
            setValues(
                {
                    name: '',
                    phone: '',
                    email: '',
                    suggestion: ''
                }
            )
            return result;
        }

        // addFormWithMock(form);
        // deleForm(2);
    }
    return {
        values,
        handleInputChange,
        handelForm,
        msgError,
        arrErrorMsg
    };
}

export function Form(props) {
    const { dark } = useContext(ThemeContext)
    const useStyle = makeStyles(() => ({
        darkTheme: {
            paddingTop: '0.5rem',
            borderTop: '0.2rem solid rgba(255, 255, 255, 0.7)',
            color: 'white',
            '& .MuiFormControl-root': {
                width: '100%',
                margin: '0.3rem 0 0.3rem 0',
                color: 'white'
            },
            '& .contact_title': {
                '&.css-2ulfj5-MuiTypography-root': {
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                }
            },
            '& .contact_form': {
                '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                    color: 'rgba(174, 177, 182, 0.75)',
                    fontFamily: 'monospace',
                },
                '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root': {
                    color: 'white',
                    fontFamily: 'monospace',
                    '&.Mui-error': {
                        color: '#d32f2f',
                    },
                },
                '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d32f2f',
                        },
                    },
                    color: 'white',
                    fontFamily: 'monospace',
                },
                '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '0.13rem',
                        borderColor: '#522733',
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d32f2f',
                        },
                    },
                },
                '& .css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d32f2f',
                        },
                    },
                    color: 'white',
                    fontFamily: 'monospace',
                },
                '& .css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '0.13rem',
                        borderColor: '#522733',
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d32f2f',
                        },
                    },
                }
            },
            '& .contact_btn': {
                '&.css-1fu7jd5-MuiButtonBase-root-MuiButton-root': {
                    textTransform: 'none',
                    fontFamily: 'monospace',
                    border: '0.05rem solid white',
                    backgroundColor: grey[800],
                },
                '&.css-1fu7jd5-MuiButtonBase-root-MuiButton-root:hover': {
                    backgroundColor: '#522733',
                },
            }
        },
        whiteTheme: {
            paddingTop: '0.5rem',
            borderTop: '0.2rem solid rgba(255, 255, 255, 0.7)',
            borderColor: blue[900],
            color: blue[900],
            '& .MuiFormControl-root': {
                width: '100%',
                margin: '0.3rem 0 0.3rem 0',
                color: 'white'
            },
            '& .contact_title': {
                '&.css-ag7rrr-MuiTypography-root': {
                    color: blue[900],
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                }
            },
            '& .contact_form': {
                '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                    color: 'rgba(11, 54, 227, 0.38)',
                    fontFamily: 'monospace',
                },
                '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root': {
                    color: blue[900],
                    fontFamily: 'monospace',
                    '&.Mui-error': {
                        color: '#d32f2f',
                    },
                },
                '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: blue[900],
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d32f2f',
                        },
                    },
                    color: blue[900],
                    fontFamily: 'monospace',
                },
                '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '0.13rem',
                        borderColor: yellow[700],
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d32f2f',
                        },
                    },
                },
                '& .css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: blue[900],
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d32f2f',
                        },
                    },
                    color: blue[900],
                    fontFamily: 'monospace',
                },
                '& .css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '0.13rem',
                        borderColor: yellow[700],
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d32f2f',
                        },
                    },
                },
            },
            '& .contact_btn': {
                '&.css-1fu7jd5-MuiButtonBase-root-MuiButton-root': {
                    textTransform: 'none',
                    fontFamily: 'monospace',
                    border: '0.05rem solid black',
                    backgroundColor: blue[900],
                },
                '&.css-1fu7jd5-MuiButtonBase-root-MuiButton-root:hover': {
                    backgroundColor: yellow[700],
                },
            }
        }
    }))

    const classes = useStyle();
    return (
        <Box component={'form'} className={dark ? classes.darkTheme : classes.whiteTheme}>
            {props.children}
        </Box>
    )
}
