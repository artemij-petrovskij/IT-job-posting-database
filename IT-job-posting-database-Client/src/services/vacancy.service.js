class Vacancy {
    static allVacancies = async (body) => {
        try {
            const response = await fetch(`http://localhost:8080/api/vacancy/vacancies`,
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

    static getOneAdvert = async (id) => {
        const response = await fetch(`http://localhost:8080/api/vacancy/vacancy/${id}`);
        return await response.json()
    }

    static getOneVacancy = async (id) => {
        const response = await fetch(`http://localhost:8080/api/vacancy/vacancy/${id}`);
        return await response.json()
    }


    static createVacancy = async (body) => {
        try {


            const response = await fetch(`http://localhost:8080/api/vacancy/create-vacancy`,
                {
                    method: 'put',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                });
            if (response.status === 201) {
                return response.json()

            } else {
                return { err: 'Server error' }
            }
        } catch (err) {
            console.error(err);
        }
    }

    static createCompany = async (body) => {
        try {


            const response = await fetch(`http://localhost:8080/api/vacancy/create-company`,
                {
                    method: 'put',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                });
            if (response.status === 201) {
                return response.json()

            } else {
                return { err: 'Server error' }
            }
        } catch (err) {
            console.error(err);
        }
    }

    static getOneCompany = async (id) => {
        const response = await fetch(`http://localhost:8080/api/vacancy/vacancies/${id}`);
        return await response.json()
    }


    static createCategory = async (body) => {
        try {


            const response = await fetch(`http://localhost:8080/api/vacancy/create-category`,
                {
                    method: 'put',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                });
            if (response.status === 201) {
                return response.json()

            } else {
                return { err: 'Server error' }
            }
        } catch (err) {
            console.error(err);
        }
    }
    static createReply = async (body) => {
        try {


            const response = await fetch(`http://localhost:8080/api/vacancy/create-reply`,
                {
                    method: 'put',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                });
            if (response.status === 201) {
                return response.json()

            } else {
                return { err: 'Server error' }
            }
        } catch (err) {
            console.error(err);
        }
    }


    static loadCurrentVacancies = async (body) => {
        try {
            const response = await fetch(`http://localhost:8080/api/resume/current-vacancies`,
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


    static getReplies = async (body) => {
        try {


            const response = await fetch(`http://localhost:8080/api/vacancy/getreplies`,
                {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                });
            if (response.status !== 201) {
                return response.json()

            } else {
                return { err: 'Server error' }
            }
        } catch (err) {
            console.error(err);
        }
    }

    static changeStatus = async (body) => {
        try {


            const response = await fetch(`http://localhost:8080/api/vacancy/changestatus`,
                {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                });
            if (response.status !== 201) {
                return response.json()

            } else {
                return { err: 'Server error' }
            }
        } catch (err) {
            console.error(err);
        }
    }

    static companyFeedback = async (body) => {
        try {


            const response = await fetch(`http://localhost:8080/api/vacancy/company-feedback`,
                {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                });
            if (response.status == 500) {
                return response.json()

            } else {
                return { err: 'Server error' }
            }
        } catch (err) {
            console.error(err);
        }
    }

}

export { Vacancy }