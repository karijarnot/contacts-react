package com.jarnot_kari.contacts.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.jarnot_kari.contacts.entity.ContactEntity;
import com.jarnot_kari.contacts.service.ContactService;

@Controller
public class ContactController {
	
	@Autowired
	private ContactService contactService;
	
	/**
	 * Retrieves all contacts and displays them on the home page of the application
	 * 
	 * @param model
	 * @return
	 */
	@GetMapping("/")
	public String showContacts(Model model,  RedirectAttributes redirectAttributes) {		
		model.addAttribute("contacts", contactService.listAllContacts());
		model.addAttribute("contact", new ContactEntity());
		return "contacts";
	}

	/**
	 * Retrieves contacts that match the first name or last name entered and displays them in a list
	 * 
	 * @param model
	 * @param contact
	 * @return
	 */
	@PostMapping("/")
	public String findContacts(Model model, ContactEntity contact) {
		model.addAttribute("contacts", contactService.findContacts(contact));
		model.addAttribute("contact", new ContactEntity());
		return "contacts";
	}
	
	/**
	 * Saves the new contact entered and redirects to the home page of the application with a success message
	 * 
	 * @param contact
	 * @param redirectAttributes
	 * @return
	 */
	@PostMapping("/add_contact")
	public String addContact(ContactEntity contact,  RedirectAttributes redirectAttributes) {
		contactService.createContact(contact);
		redirectAttributes.addFlashAttribute("successMessage", "Contact successfully added.");
		return "redirect:/";
	}
	
	/**
	 * Gets the contact requested by id and displays it to allow the user to make updates
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@GetMapping("/update_contact/{id}")
	public String showContactForUpdate(@PathVariable Long id, Model model) {
		model.addAttribute("contact", contactService.getContact(id));
		return "update";
	}
	
	/**
	 * Saves the user's contact updates and redirects to the home page with a success message
	 * 
	 * @param contact
	 * @param redirectAttributes
	 * @return
	 */
	@PostMapping("/update_contact")
	public String updateContact(ContactEntity contact, RedirectAttributes redirectAttributes) {
		contactService.updateContact(contact);
		redirectAttributes.addFlashAttribute("successMessage", "Contact successfully updated.");
		return "redirect:/";
	}
	
	/**
	 * Deletes the contact requested by id and redirects to the home page with a success message
	 * This is not an ideal solution. A delete should not be undertaken from a get mapping
	 * 
	 * @param id
	 * @param redirectAttributes
	 * @return
	 */
	@GetMapping("/delete_contact/{id}")
	public String deleteContact(@PathVariable Long id, RedirectAttributes redirectAttributes) {
		contactService.deleteContact(id);
		redirectAttributes.addFlashAttribute("successMessage", "Contact successfully deleted.");
		return "redirect:/";
	}
}
