package com.jarnot_kari.contacts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.jarnot_kari.contacts.entity.ContactEntity;
import com.jarnot_kari.contacts.service.ContactService;

@RestController
@RequestMapping("contacts-rest")
public class ContactRestController {
	
	@Autowired
	private ContactService contactService;
	
	@GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Iterable<ContactEntity> showContacts() {		
		return contactService.listAllContacts();
	}


	@PostMapping(path="/search", consumes=MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<ContactEntity> searchContacts(@RequestBody ContactEntity contact) {
		return contactService.searchContacts(contact);
	}
	
	@PostMapping(path="/add", consumes=MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(value=HttpStatus.OK)
	public @ResponseBody ContactEntity addContact(@RequestBody ContactEntity contact) {
		return contactService.addContact(contact);
	}
	
	@PutMapping(path="/update", consumes=MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(value=HttpStatus.OK)
	public void updateContact(@RequestBody ContactEntity contact) {
		contactService.updateContact(contact);
	}
	

	@DeleteMapping("/{id}")
	public void deleteContact(@PathVariable Long id) {
		contactService.deleteContact(id);
	}
}
