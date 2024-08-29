export default (schemas, target) => {
    return (req, res, next) => {
        const {error} = schemas.validate(req[target], {
            abortEarly: false,
        });

        if(error) {
            const fields = {};

            error.details.forEach(detail => {
                fields[detail.path[0]] = detail.message;
            })

            const hasErrors = Object.keys(fields).length > 0;

            if(hasErrors) {
                res.status(422).json({
                    message: 'Validation error',
                    fields,
                });
                return;
            }
        }
        next()
    }
}