module.exports = {
    Debug
};

function Debug(message) {
    console.log(message);
}

function Error(message, error) {
    console.log(message);
    console.log(error);
}