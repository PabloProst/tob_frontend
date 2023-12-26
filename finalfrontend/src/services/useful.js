export const validator = (type, value) => {

    switch (type) {

        case 'email':
        case 'correo':
        case 'mail':

            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
                return "Invalid e-mail format";
            } else {
                return "";
            }

        case 'name':
        case 'firstName':

            if (value.length > 25 || value.length < 3) {
                return "Name must be between 3 and 25 character long"
            } else {
                return ""
            }

        case 'password':

            if (value.length < 8) {
                return "The password must be at least 8 character long, include at least one number, and have a special character."
            } else {

                if (! /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(value)) {
                    return "The password must be at least 8 character long, include at least one number, and have a special character.";
                } else {
                    return "";
                }
            }


    }
}