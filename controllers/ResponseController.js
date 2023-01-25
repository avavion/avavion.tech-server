class ResponseController {
  success(res, data, code = 200) {
    const response = {
      success: true,
      data: data,
    };

    return res.status(code).json(response);
  }

  failed(res, data, code = 200) {
    const templateData = {
      message: "An error occurred during the query!",
    };

    const response = {
      success: false,
      data: data || templateData,
    };

    return res.status(code).json(response);
  }
}

export default ResponseController;
