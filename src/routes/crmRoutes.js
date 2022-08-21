import { Router } from 'express';
import {
  addNewContact,
  getContact,
  getContactWithID,
  updateContact,
  deleteContact,
} from '../controllers/crmController.js';

const router = Router();

router
  .route('/')
  .get((req, res, next) => {
    // Middleware
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request method: ${req.method}`);
    next();
  }, getContact)
  .post(addNewContact);

router
  .route('/:contactID')
  .get(getContactWithID)
  .put(updateContact)
  .delete(deleteContact);

export default router;
