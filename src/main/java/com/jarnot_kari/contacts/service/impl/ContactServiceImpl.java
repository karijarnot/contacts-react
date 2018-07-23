package com.jarnot_kari.contacts.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jarnot_kari.contacts.entity.ContactEntity;
import com.jarnot_kari.contacts.repository.ContactsRepository;
import com.jarnot_kari.contacts.service.ContactService;

@Service
@Transactional
public class ContactServiceImpl implements ContactService {

	@Autowired
	private ContactsRepository contactsRepository;

	@Override
	public ContactEntity addContact(ContactEntity contact) {
		return contactsRepository.save(contact);
	}

	@Override
	public List<ContactEntity> searchContacts(ContactEntity contact) {
		return contactsRepository.findByFirstNameContainingIgnoreCaseAndLastNameContainingIgnoreCase(contact.getFirstName(), contact.getLastName());
	}

	@Override
	public Iterable<ContactEntity> listAllContacts() {
		return contactsRepository.findAll();
	}

	@Override
	public void deleteContact(Long id) {
		contactsRepository.deleteById(id);
	}

	@Override
	public ContactEntity getContact(Long id) {
		return contactsRepository.findById(id).get();
	}

	@Override
	public void updateContact(ContactEntity contact) {
		contactsRepository.save(contact);
	}
	
	
	
	
}
