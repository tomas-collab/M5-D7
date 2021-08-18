import expresValidator from 'express-validator';

const {body} = expresValidator;

export const postValidation = [
    body("title").exists().withMessage("Title is a mandatory field!"),
    body("category").exists().withMessage("Category is a mandatory field!"),
    body("author.name").exists().withMessage("Name is a mandatory field!"),
  ]