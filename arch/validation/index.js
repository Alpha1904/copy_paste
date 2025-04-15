const yup = require("yup");

const validation = async (req, res, next) => {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Enter a title")
      .min(3, "Title must be at least 3 characters long"),
    description: yup.string(),
    completed: yup.boolean(),
    dueDate: yup.date().min(new Date(), "Date must be in the future"),
  });

  const { title, description, completed, dueDate } = req.body;

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      errors: ["Completed must be a boolean value"],
    });
  }

  try {
      await schema.validate({ title, description, dueDate }, { abortEarly: false });
      next();
  } catch (err) {
     const errors = err.inner.map(e => ({
        field: e.path,
        message: e.message
      }))
      res.status(400).json({
        warning: err.message,
        errors: errors,
      });
  }
};

module.exports = validation;


