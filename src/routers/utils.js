function controllerWrapper(mdw) {
  return async (req, res) => {

    try {
      await mdw(req, res);
    } catch(error) {
      console.error(error);

      const body = {
        error: "Server Error. Please try again later"
      };
      
      if (process.env.NODE_ENV === "dev") {
        body.stack = error;
      }

      res.status(500).json(body);
    }
  };
}

module.exports = { controllerWrapper };