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

    timeAgo(createdAt) {
        const now = new Date();
        const created = new Date(createdAt);

        const diffInMs = now - created;

        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const month = day * 30;
        const year = day * 365;

        //top-down approach
        if (diffInMs >= year) {
            const yearsAgo = Math.floor(diffInMs / year);
            return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
        }
        if (diffInMs >= month) {
            const monthsAgo = Math.floor(diffInMs / month);
            return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
        }
        if (diffInMs >= week) {
            const weeksAgo = Math.floor(diffInMs / week);
            return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
        }
        if (diffInMs >= day) {
            const daysAgo = Math.floor(diffInMs / day);
            return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
        }
        if (diffInMs >= hour) {
            const hoursAgo = Math.floor(diffInMs / hour);
            return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
        }
        const minutesAgo = Math.floor(diffInMs / minute);
        return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    },
};

module.exports = helper;
