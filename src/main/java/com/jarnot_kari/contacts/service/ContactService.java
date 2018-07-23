package com.jarnot_kari.contacts.service;

import java.util.List;

import com.jarnot_kari.contacts.entity.ContactEntity;

public interface ContactService {
	
	/**
	 * Stores a new Contact
	 * 
	 * @param contact
	 */
	public ContactEntity addContact(ContactEntity contact);
	
	/**
	 * Finds contacts by Last Name and/or First Name
	 * 
	 * @param contact
	 * @return a list of matching contacts
	 */
	public List<ContactEntity> searchContacts(ContactEntity contact);
	
	/**
	 *  
	 * @return a list of all contacts
	 */
	public Iterable<ContactEntity> listAllContacts();
	
	/**
	 * Deletes the contact with the id passed in
	 * 
	 * @param id
	 */
	public void deleteContact(Long id);
	
	/**
	 * Retrieves the contact with the id passed in
	 * 
	 * @param id
	 * @return
	 */
	public ContactEntity getContact(Long id);
	
	/**
	 * Saves the contact passed in
	 * 
	 * @param contact
	 */
	public void updateContact(ContactEntity contact);
}
