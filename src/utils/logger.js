module.exports = {
    Debug,
    Error
};

function Debug(message) {
    console.log(message);
}

function Error(message, error) {
    console.log(message);
    console.log(error);
}