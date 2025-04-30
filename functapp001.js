// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Extracting serviceName and ratingNum from query or body
    const serviceName = req.query.serviceName || (req.body && req.body.serviceName);
    const ratingNum = req.query.ratingNum || (req.body && req.body.ratingNum);

    // Check if serviceName is provided and ratingNum is a valid number
    if (!serviceName || ratingNum === undefined) {
        context.res = {
            status: 400,
            body: "Please provide both serviceName and ratingNum."
        };
        return;
    }

    const rating = Number(ratingNum);

    if (isNaN(rating)) {
        context.res = {
            status: 400,
            body: "ratingNum must be a number."
        };
        return;
    }

    let responseMessage;

    if (rating >= 7 && rating <= 10) {
        responseMessage = `Good review for ${serviceName}!`;
    } else {
        responseMessage = `Bad review for ${serviceName}.`;
    }

    context.res = {
        status: 200,
        body: responseMessage
    };
};

