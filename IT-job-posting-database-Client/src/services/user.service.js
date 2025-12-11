class User {
    static allUsers = async (body) => {
        try {
            const response = await fetch(`http://localhost:8080/user/users`,
                {
                    method: 'get',

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                });
            if (response.status === 200) {
                return response.json()
            } else {
                return { err: 'Server error' }
            }
        } catch (err) {
            console.error(err);
        }
    }

    static updateCompany = async (body) => {
        try {
            const response = await fetch(`http://localhost:8080/user/update`,
                {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                });
            if (response.status === 200) {
                return response.json()
            } else {
                return { err: 'Server error' }
            }
        } catch (err) {
            console.error(err);
        }
    }

}

export { User }