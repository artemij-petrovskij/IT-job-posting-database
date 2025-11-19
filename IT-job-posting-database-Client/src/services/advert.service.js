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

    // static createAdvertTN = async (body) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/advert-TN`,
    //             {
    //                 method: 'put',
    //                 body: JSON.stringify(body),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.jwt}`
    //                 },
    //             });
    //         if (response.status === 201) {
    //             return response.json()

    //         } else {
    //             return { err: 'Server error' }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // static createAdvertPKO = async (body) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/advert-PKO`,
    //             {
    //                 method: 'put',
    //                 body: JSON.stringify(body),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.jwt}`
    //                 },
    //             });
    //         if (response.status === 201) {
    //             return response.json()

    //         } else {
    //             return { err: 'Server error' }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // static createAdvertRKO = async (body) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/advert-RKO`,
    //             {
    //                 method: 'put',
    //                 body: JSON.stringify(body),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.jwt}`
    //                 },
    //             });
    //         if (response.status === 201) {
    //             return response.json()

    //         } else {
    //             return { err: 'Server error' }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // static createAdvertPSO = async (body) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/advert-PSO`,
    //             {
    //                 method: 'put',
    //                 body: JSON.stringify(body),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.jwt}`
    //                 },
    //             });
    //         if (response.status === 201) {
    //             return response.json()

    //         } else {
    //             return { err: 'Server error' }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    // static createAdvertPNA = async (body) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/advert-PNA`,
    //             {
    //                 method: 'put',
    //                 body: JSON.stringify(body),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.jwt}`
    //                 },
    //             });
    //         if (response.status === 201) {
    //             return response.json()

    //         } else {
    //             return { err: 'Server error' }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

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
    // static loadMyAdvertsPKO = async (body) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/my-adverts-PKO`,
    //             {
    //                 method: 'post',
    //                 body: JSON.stringify(body),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.jwt}`
    //                 },
    //             });
    //         if (response.status === 200) {
    //             return response.json()
    //         } else {
    //             return { err: 'Server error' }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    // static loadMyAdvertsRKO = async (body) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/my-adverts-RKO`,
    //             {
    //                 method: 'post',
    //                 body: JSON.stringify(body),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.jwt}`
    //                 },
    //             });
    //         if (response.status === 200) {
    //             return response.json()
    //         } else {
    //             return { err: 'Server error' }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    // static loadMyAdvertsPSO = async (body) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/my-adverts-PSO`,
    //             {
    //                 method: 'post',
    //                 body: JSON.stringify(body),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.jwt}`
    //                 },
    //             });
    //         if (response.status === 200) {
    //             return response.json()
    //         } else {
    //             return { err: 'Server error' }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    // static loadMyAdvertsPNA = async (body) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/my-adverts-PNA`,
    //             {
    //                 method: 'post',
    //                 body: JSON.stringify(body),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.jwt}`
    //                 },
    //             });
    //         if (response.status === 200) {
    //             return response.json()
    //         } else {
    //             return { err: 'Server error' }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

}

export { Advert }