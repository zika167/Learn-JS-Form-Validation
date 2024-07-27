function Validator(options) {

    // hàm thực hiện validate
    function validate(inputElement, rule) {
        // value: inputElement.value
        // test func: rule.test
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage = rule.test(inputElement.value)

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.classList.add('invalid')
        } else {
            errorElement.innerText = '';
            inputElement.classList.remove('invalid')
        }
    }
    
    // lấy ra element của form cần validate
    var formElement = document.querySelector(options.form);
    // console.log(formElement)

    if (formElement) {
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector);
            // lấy ra element input
            // console.log(inputElement)

            if (inputElement) {
                // xử lý khi blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement,rule)
                }

                // xử lý khi người dùng gõ vào
                inputElement.onclick = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = '';
                    inputElement.classList.remove('invalid')
                }
            }
        })
    }
}


// Định nghĩa rules
// Nguyên tắc của các rule:
// 1. khi hợp lệ >>> không trả ra gì cả ( undefined)
// 2. khi có lỗi >>> trả ra message lỗi

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này!'
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là email'
        }
    }
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `Nhập ít nhất ${min} kí tự!`
        }
    }
}