package com.jarnot_kari.contacts.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContactController {
	
	
	/**
	 * Loads the react application
	 * 
	 * @param model
	 * @return
	 */
	@GetMapping("/")
	public String loadContactApplication() {		
		return "contacts.html";
	}

}
