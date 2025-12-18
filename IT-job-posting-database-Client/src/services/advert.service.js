class Advert {
    static allAdverts = async (body) => {
        try {
            const response = await fetch(`http://localhost:8080/api/resume/adverts`,
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
        const response = await fetch(`http://localhost:8080/api/resume/advert/${id}`);
        return await response.json()
    }

    static deleteAdvert = async (id) => {

        try {
            const response = await fetch(`http://localhost:8080/api/resume/advert/${id}`,
                {
                    method: 'delete',
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

    static createAdvert = async (body) => {
        try {


            const response = await fetch(`http://localhost:8080/api/resume/advert`,
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

     static updateResume = async (body) => {
        try {


            const response = await fetch(`http://localhost:8080/api/resume/advert`,
                {
                    method: 'post',
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


    static updateAdvert = async (body) => {
        try {


            const response = await fetch(`http://localhost:8080/api/resume/advert/${body._id}`,
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

    static loadMyAdverts = async (body) => {
        try {
            const response = await fetch(`http://localhost:8080/api/resume/my-adverts`,
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
    static loadMyAdvertsTN = async (body) => {
        try {
            const response = await fetch(`http://localhost:8080/api/resume/my-adverts-TN`,
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

export { Advert }