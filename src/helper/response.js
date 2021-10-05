const successfulResponse = ({ response, data, message, meta }) => {
    return response.status(200).json({
      status: true,
      message,
      meta,
      data,
    });
  };
  
  const createdResponse = ({ response, data, message }) => {
    return response.status(201).json({
      status: true,
      message,
      data,
    });
  };
  
  const deletedResponse = ({ response, data, message }) => {
    return response.status(204).json({
      status: true,
      message,
      data,
    });
  };
  
  const conflictResponse = ({ response, data, message }) => {
    return response.status(409).json({
      status: false,
      message,
      data,
    });
  };
  
  const badRequestResponse = ({ response, data, message }) => {
    return response.status(400).json({
      status: false,
      message,
      data,
    });
  };
  
  const unauthorizedResponse = ({ response, data, message }) => {
    return response.status(401).json({
      status: false,
      message,
      data,
    });
  };
  
  const forbiddenResponse = ({ response, data, message }) => {
    return response.status(403).json({
      status: false,
      message,
      data,
    });
  };
  
  const notFoundResponse = ({ response, data, message }) => {
    return response.status(404).json({
      status: false,
      message,
      data,
    });
  };
  
  const serverErrorResponse = ({ response, data, message }) => {
    return response.status(500).json({
      status: false,
      message,
      data,
    });
  };
  
  const validationErrorResponse = ({ response, message, field }) => {
    return response.status(500).json({
      status: false,
      message: 'validation error',
      data: [
        {
          message,
          field,
          validation: 'valid',
        },
      ],
    });
  };
  
  export {
    successfulResponse,
    conflictResponse,
    createdResponse,
    deletedResponse,
    badRequestResponse,
    unauthorizedResponse,
    forbiddenResponse,
    notFoundResponse,
    serverErrorResponse,
    validationErrorResponse,
  };