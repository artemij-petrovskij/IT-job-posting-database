class Report {
    static getReportData = async (body) => {
        try {
            const response = await fetch(`http://localhost:8080/report/report`,
                {
                    method: 'post',
                });

            if (response.status !== 500) {

                return await response.json()
            } else {
                return { err: 'Server error' }
            }
        } catch (err) {
            console.error(err);
        }
    }




}

export { Report }
