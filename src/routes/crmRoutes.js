import { Router } from 'express';
import {
  addNewContact,
  getContact,
  getContactWithID,
  updateContact,
  deleteContact,
} from '../controllers/crmController.js';

import {
  login,
  register,
  loginRequired,
} from '../controllers/userControllers.js';

const router = Router();

// CREAT CONTACT LIST
router
  .route('/')
  .get(
    (req, res, next) => {
      // Middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request method: ${req.method}`);
      next();
    },
    loginRequired,
    getContact
  )
  .post(loginRequired, addNewContact);

// GET CONTACT BY ID
router
  .route('/:contactID')
  .get(loginRequired, getContactWithID)
  .put(loginRequired, updateContact)
  .delete(loginRequired, deleteContact);

// AUTHENTICATION
router.route('/register').post(register);
router.route('/login').post(login);

export default router;
