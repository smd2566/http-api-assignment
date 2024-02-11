// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  console.log(object);
  response.write(JSON.stringify(object));
  response.end();
};

// Function to respond with an XML object
const respondXML = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'text/xml',
  };

  // send response with json object
  response.writeHead(status, headers);

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${object.message}</message>`; // Its continuously appending
  if (object.id !== undefined) {
    responseXML = `${responseXML} <id>${object.id}</id>`;
  }
  responseXML = `${responseXML} </response>`;

  response.write(responseXML);
  console.log(responseXML);
  response.end();
};

// Success status code function
const success = (request, response, acceptedTypes) => {
  // message to send
  const responseTYPE = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 200, responseTYPE);
  }
  return respondJSON(request, response, 200, responseTYPE);
};

// Forbidden status code function
const forbidden = (request, response, acceptedTypes) => {
  // message to send
  const responseTYPE = {
    message: 'Forbidden; You do not have access',
  };

  if (acceptedTypes[0] === 'text/xml') {
    respondXML(request, response, 403, responseTYPE);
  } else {
    respondJSON(request, response, 403, responseTYPE);
  }
};

// Internal error status code function
const internal = (request, response, acceptedTypes) => {
  // message to send
  const responseTYPE = {
    message: 'Internal Server Error; Something went wrong',
  };

  // send our json with an internal status code
  if (acceptedTypes[0] === 'text/xml') {
    respondXML(request, response, 500, responseTYPE);
  } else {
    respondJSON(request, response, 500, responseTYPE);
  }
};

// Not Implemented status code function
const notImplemented = (request, response, acceptedTypes) => {
  // message to send
  const responseTYPE = {
    message: 'Not Implemented; Check back later',
  };

  // send our json with a not implemented status code
  if (acceptedTypes[0] === 'text/xml') {
    respondXML(request, response, 501, responseTYPE);
  } else {
    respondJSON(request, response, 501, responseTYPE);
  }
};

// Bad Request status code function + checks params
const badRequest = (request, response, acceptedTypes, params) => {
  // message to send
  const responseTYPE = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseTYPE.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseTYPE.id = 'badRequest';
    // return our json with a 400 bad request code
    if (acceptedTypes[0] === 'text/xml') {
      return respondXML(request, response, 400, responseTYPE);
    }
    return respondJSON(request, response, 400, responseTYPE);
  }

  // if the parameter is here, send json with a success status code
  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 200, responseTYPE);
  }
  return respondJSON(request, response, 200, responseTYPE);
};

// Unauthorized status code function + checks params
const unauthorized = (request, response, acceptedTypes, params) => {
  // message to send
  const responseTYPE = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a loggedIn=yes query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    responseTYPE.message = 'Missing loggedIn query parameter set to yes';
    // give the error a consistent id
    responseTYPE.id = 'Unauthorized';
    // return our json with a 401 bad request code
    if (acceptedTypes[0] === 'text/xml') {
      return respondXML(request, response, 401, responseTYPE);
    }
    return respondJSON(request, response, 401, responseTYPE);
  }

  // if the parameter is here, send json with a success status code
  if (acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 200, responseTYPE);
  }
  return respondJSON(request, response, 200, responseTYPE);
};

// function for 404 not found requests with message
const notFound = (request, response, acceptedTypes) => {
  // create error message for response
  const responseTYPE = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  if (acceptedTypes[0] === 'text/xml') {
    respondXML(request, response, 404, responseTYPE);
  } else {
    respondJSON(request, response, 404, responseTYPE);
  }
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};

// set public modules
module.exports = {
  notFound,
  notFoundMeta,
  success,
  forbidden,
  internal,
  notImplemented,
  badRequest,
  unauthorized,
};
