const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
//@desc Get all contacts
//@route GET /api/contacts
//@access private

// get one contact
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }
  res.status(200).json(contact)
})
// get all contacts
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id })
  res.status(200).json(contacts)
})

// create contact
const createContact = asyncHandler(async (req, res) => {
  console.log('req body is:', req.body)
  const { name, email, phone, location } = req.body
  if (!name || !email || !phone || !location) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    location,
    user_id: req.user.id,
  })
  res.status(201).json(contact)
})

// update contact
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User don't have permission to update other contacts")
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  )

  res.status(200).json(updatedContact)
})

// delete contact
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User don't have permission to update other contacts")
  }
  await Contact.deleteOne({_id: req.params.id})
  res.status(200).json(contact)
})

module.exports = {
  getContact, // one contact
  getContacts, // more than one contacts
  updateContact, // update contact
  deleteContact, // delete the contact
  createContact, // create a contact
}
