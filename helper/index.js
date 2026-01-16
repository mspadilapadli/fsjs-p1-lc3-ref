const helper = {
    formatValdiateErrors(error) {
        if (error.name == `SequelizeValidationError`) {
            const errors = {};
            error.errors.forEach((e) => {
                errors[e.path] = e.message;
            });
            return errors;
        }
        return null;
    },
    formatTime(dateInput) {
        let publised = new Date() - dateInput;
        publised = publised / 1000;
        let minutes = publised / 60;
        return minutes;
    },
};

module.exports = helper;
