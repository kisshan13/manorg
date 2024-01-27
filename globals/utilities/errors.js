export function handleZodError(error) {
    const message = JSON.parse(error.message);
    const errorMessages = message.map((errorMsg) => {

        const fieldName = errorMsg.path?.length === 2 ? errorMsg.path[1] : errorMsg.path[0];
        const errorMessage = errorMsg.message;
        return `${fieldName}: ${errorMessage}`;
    });

    return {message: errorMessages, status: 422};
}


export function handleMongoServerError(error) {
    switch (error.code) {
        case 11000:
            const alreadyExists = Object.keys(error?.keyPattern);
            return {
                status: 400,
                message: `${alreadyExists.join()} already exists`,
            };

        default:
            return {
                status: 500,
                message: "Internal server error",
            };
    }
}

export class ApiError extends Error{
    constructor (status, message) {
        super();
        this.status = status
        this.message = message
    }
}