function forms(state) {
    const formWrapper = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="phone"]'),
          upload = document.querySelectorAll('[name="file"]');

    const message = {
        loading: 'loading...',
        success: 'Application sent successfully!',
        failure: 'Something went wrong...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(input => { ////очищаем поля ввода
            input.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Attach file';
        });
    };


    formWrapper.forEach(item => {
        const allRequireInputs =  item.querySelectorAll('.input--required');
        allRequireInputs.forEach(input => {

            input.addEventListener('change', (event) => {
                validation(item, input, event);
                input.addEventListener('input', (event) => {
                    validation(item, input, event);
                });
            });
        })

        item.addEventListener('submit', (event) => {
            event.preventDefault();

           
            
            if (validation(item, false, event)) {
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.appendChild(statusMessage);

                const formData = new FormData(item);

                if (item.getAttribute('data-calc')  === "end") {
                    for (let key in state) {
                        formData.append(key, state[key]);
                    }
                }

                postData('functionsToMail.php', formData)
                    .then(res => {
                        statusMessage.textContent = message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = message.failure;
                    })
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });

                    const checkboxs = document.querySelectorAll('input[name="checkbox"]');
                    checkboxs.forEach(checkbox => {
                        checkbox.checked = false;
                    })
            }
        });
    });

    phoneInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/, '')
        });
    });

    



    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const arr = item.files[0].name.split('.'); 
            arr[0].length > 15 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 15) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        })
    })

    function validation(form, inputFocus, event) {

        let result = true;
        let emailFlag = false;
        const minLength = 18;

        const tooltips = document.querySelectorAll('.tooltip');

        function removeError(input) {
            const parent = input.parentNode;

            if(parent.classList.contains('form-main__item-error')){
                parent.querySelector('.error-div').remove();
                parent.classList.remove('form-main__item-error')
                input.classList.remove('error-focus-border');
                tooltips.forEach(tooltip => {
                    if (parent.classList.contains('form-main__item-error') && parent.querySelector('.tooltip')) {
                        tooltip.classList.remove('tooltip-error');
                    }
                })
            }
            
        }

        //////////СОЗДАНИЕ ТЕКСТА ОШИБКИ ПОД ПОЛЯМИ
        function createError(input, text) {
            const parent = input.parentNode;
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('error-div');
            errorDiv.textContent = text;
            parent.append(errorDiv);
            parent.classList.add('form-main__item-error');
            input.classList.add('error-focus-border');
            tooltips.forEach(tooltip => {
                if (parent.classList.contains('form-main__item-error') && parent.querySelector('.tooltip')) {
                    tooltip.classList.add('tooltip-error');
                }
            })
        }


        

        function createErrorMessage(inputFocusCurrent) {
            if(inputFocusCurrent.value == "" && inputFocusCurrent.getAttribute('name') === 'phone') {
                createError(inputFocusCurrent, 'The field is not filled');
                result = false;
            } else if (inputFocusCurrent.value == "" && inputFocusCurrent.getAttribute('name') === 'email') {
                createError(inputFocusCurrent, 'The field is not filled');
                result = false;
            } else if(inputFocusCurrent.value.length < minLength && inputFocusCurrent.getAttribute('name') === 'phone') {
                createError(inputFocusCurrent, 'Enter the full number');
                result = false;
            } else if ((emailFlag == false) && inputFocusCurrent.getAttribute('name') === 'email') {
                createError(inputFocusCurrent, 'Incorrect E-Mail Address.');
                result = false;
            } else if (!inputFocusCurrent.checked && inputFocusCurrent.getAttribute('name') === 'checkbox' && event.type == 'submit') {
                createError(inputFocusCurrent, 'Confirm your consent');
                result = false;
            }
        }

        

        function isEmailValid(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }

        if (inputFocus) {
            const allInputs =  form.querySelectorAll('.input--required')
            for (const input of allInputs) {
                removeError(inputFocus);
                if (isEmailValid(input.value)) {
                    emailFlag = true
                }
            }
            createErrorMessage(inputFocus)
        } else {
            const allInputs =  form.querySelectorAll('.input--required')
            for (const input of allInputs) {
                removeError(input);
                // let emailFlag = false;

                

                if (isEmailValid(input.value)) {
                    emailFlag = true
                }

                if(input.value == "" && input.getAttribute('name') === 'phone') {
                    createError(input, 'The field is not filled');
                    result = false;
                } else if (input.value == "" && input.getAttribute('name') === 'email') {
                    createError(input, 'The field is not filled');
                    result = false;
                } else if(input.value.length < minLength && input.getAttribute('name') === 'phone') {
                    createError(input, 'Enter the full number');
                    result = false;
                } else if ((emailFlag == false) && input.getAttribute('name') === 'email') {
                    createError(input, 'Incorrect E-Mail Address.');
                    result = false;
                } else if (!input.checked && input.getAttribute('name') === 'checkbox' && event.type == 'submit') {
                    createError(input, 'Confirm your consent');
                    result = false;
                }
            }
        }

        

        return result;
    }

    
};

export default forms;





// function forms(state) {
//     const formWrapper = document.querySelectorAll('form'),
//           inputs = document.querySelectorAll('input'),
//           phoneInputs = document.querySelectorAll('input[name="phone"]'),
//           upload = document.querySelectorAll('[name="file"]');

//     phoneInputs.forEach(input => {
//         input.addEventListener('input', () => {
//             input.value = input.value.replace(/\D/, '')
//         });
//     });

//     const message = {
//         loading: 'Загрузка...',
//         success: 'Заявка успешно отправленна!',
//         failure: 'Что-то пошло не так...'
//     };

//     const postData = async (url, data) => {
//         document.querySelector('.status').textContent = message.loading;
//         let res = await fetch(url, {
//             method: "POST",
//             body: data
//         });
//         return await res.text();
//     };

//     const clearInputs = () => {
//         inputs.forEach(input => {
//             input.value = '';
//         });
//         upload.forEach(item => {
//             item.previousElementSibling.textContent = 'Прикрепить файл';
//         });
//     };

//     upload.forEach(item => {
//         item.addEventListener('input', () => {
//             let dots;
//             const arr = item.files[0].name.split('.'); 
//             arr[0].length > 15 ? dots = "..." : dots = '.';
//             const name = arr[0].substring(0, 15) + dots + arr[1];
//             item.previousElementSibling.textContent = name;
//         })
//     })

//     function validation(form, inputFocus, event) {

//         let result = true;
//         let emailFlag = false;
//         const minLength = 18;

//         const tooltips = document.querySelectorAll('.tooltip');

//         function removeError(input) {
//             const parent = input.parentNode;

//             if(parent.classList.contains('form-main__item-error')){
//                 parent.querySelector('.error-div').remove();
//                 parent.classList.remove('form-main__item-error')
//                 input.classList.remove('error-focus-border');
//                 tooltips.forEach(tooltip => {
//                     if (parent.classList.contains('form-main__item-error') && parent.querySelector('.tooltip')) {
//                         tooltip.classList.remove('tooltip-error');
//                     }
//                 })
//             }
            
//         }

//         //////////СОЗДАНИЕ ТЕКСТА ОШИБКИ ПОД ПОЛЯМИ
//         function createError(input, text) {
//             const parent = input.parentNode;
//             const errorDiv = document.createElement('div');
//             errorDiv.classList.add('error-div');
//             errorDiv.textContent = text;
//             parent.append(errorDiv);
//             parent.classList.add('form-main__item-error');
//             input.classList.add('error-focus-border');
//             tooltips.forEach(tooltip => {
//                 if (parent.classList.contains('form-main__item-error') && parent.querySelector('.tooltip')) {
//                     tooltip.classList.add('tooltip-error');
//                 }
//             })
//         }


        

//         function createErrorMessage(inputFocusCurrent) {
//             if(inputFocusCurrent.value == "" && inputFocusCurrent.getAttribute('name') === 'phone') {
//                 createError(inputFocusCurrent, 'Поле не заполнено');
//                 result = false;
//             } else if (inputFocusCurrent.value == "" && inputFocusCurrent.getAttribute('name') === 'email') {
//                 createError(inputFocusCurrent, 'Поле не заполнено');
//                 result = false;
//             } else if(inputFocusCurrent.value.length < minLength && inputFocusCurrent.getAttribute('name') === 'phone') {
//                 createError(inputFocusCurrent, 'Введите номер полностью');
//                 result = false;
//             } else if ((emailFlag == false) && inputFocusCurrent.getAttribute('name') === 'email') {
//                 createError(inputFocusCurrent, 'Неверный адрес электронной почты.');
//                 result = false;
//             } else if (!inputFocusCurrent.checked && inputFocusCurrent.getAttribute('name') === 'checkbox' && event.type == 'submit') {
//                 createError(inputFocusCurrent, 'Подтвердите свое согласие');
//                 result = false;
//             }
//         }

        

//         function isEmailValid(email) {
//             const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             return emailPattern.test(email);
//         }

//         if (inputFocus) {
//             const allInputs =  form.querySelectorAll('.input--required')
//             for (const input of allInputs) {
//                 removeError(inputFocus);
//                 if (isEmailValid(input.value)) {
//                     emailFlag = true
//                 }
//             }
//             createErrorMessage(inputFocus)
//         } else {
//             const allInputs =  form.querySelectorAll('.input--required')
//             for (const input of allInputs) {
//                 removeError(input);
//                 // let emailFlag = false;

                

//                 if (isEmailValid(input.value)) {
//                     emailFlag = true
//                 }

//                 if(input.value == "" && input.getAttribute('name') === 'phone') {
//                     createError(input, 'Поле не заполнено');
//                     result = false;
//                 } else if (input.value == "" && input.getAttribute('name') === 'email') {
//                     createError(input, 'Поле не заполнено');
//                     result = false;
//                 } else if(input.value.length < minLength && input.getAttribute('name') === 'phone') {
//                     createError(input, 'Введите номер полностью');
//                     result = false;
//                 } else if ((emailFlag == false) && input.getAttribute('name') === 'email') {
//                     createError(input, 'Неверный адрес электронной почты.');
//                     result = false;
//                 } else if (!input.checked && input.getAttribute('name') === 'checkbox' && event.type == 'submit') {
//                     createError(input, 'Подтвердите свое согласие');
//                     result = false;
//                 }
//             }
//         }

        

//         return result;
//     }





//     formWrapper.forEach(item => {
//         const allRequireInputs =  item.querySelectorAll('.input--required');
//         allRequireInputs.forEach(input => {

//             input.addEventListener('change', (event) => {
//                 validation(item, input, event);
//                 input.addEventListener('input', (event) => {
//                     validation(item, input, event);
//                 });
//             });
//         })


//         item.addEventListener('submit', (event) => {
//             event.preventDefault();
            
//             if (validation(item, false, event)) {

//                 let statusMessage = document.createElement('div');
//                 statusMessage.classList.add('status');
//                 item.appendChild(statusMessage);

//                 const formData = new FormData(item);

//                 if (item.getAttribute('data-calc')  === "end") {
//                     for (let key in state) {
//                         formData.append(key, state[key]);
//                     }
//                 }

//                 postData('server.php', formData)
//                     .then(res => {
//                         console.log(res);
//                         statusMessage.textContent = message.success;
//                     })
//                     .catch(() => {
//                         statusMessage.textContent = message.failure;
//                     })
//                     .finally(() => {
//                         clearInputs();
//                         setTimeout(() => {
//                             statusMessage.remove();
//                         }, 5000);
//                     });

//                     const checkboxs = document.querySelectorAll('input[name="checkbox"]');
//                     checkboxs.forEach(checkbox => {
//                         checkbox.checked = false;
//                     })
                    
//             }
//         });
//     });
// };

// export default forms;