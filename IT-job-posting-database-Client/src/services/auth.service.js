const url = '/api'

class User {
    static login = async (body) => {
        try {
            const res = await fetch(`http://localhost:8080/auth/login`, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let data = await res.json()
            if (res.status === 404) {
                return { err: 'Неправильное имя пользователя или пароль' }
            } else {
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('email', body.email);
                //localStorage.setItem('roleId', body);
                return data
            }

        } catch (err) {

            console.error(err);
        }
    }


    static signup = async (body) => {
        try {
            const res = await fetch(`http://localhost:8080/auth/signup`, {
                method: 'post',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            });

            let data = await res.json()

            if (res.status === 409) {
                return { err: 'Пользователь с таким логином уже существует' }
            } else {
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('email', body.email);
                return data
            }


        } catch (err) {

            console.error(err);
        }
    }
    static logout = async () => {
        localStorage.removeItem('user');
    }



}

export { User }