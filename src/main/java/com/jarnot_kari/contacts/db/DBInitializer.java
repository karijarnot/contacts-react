package com.jarnot_kari.contacts.db;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.jarnot_kari.contacts.entity.ContactEntity;
import com.jarnot_kari.contacts.service.ContactService;

@Configuration
public class DBInitializer {

	@Autowired
	private ContactService contactService;
	
	@PostConstruct
	public void initialize(){

		ContactEntity wyssEntity = new ContactEntity();
		wyssEntity.setFirstName("Johann David");
		wyssEntity.setLastName("Wyss");
		wyssEntity.setEmail("johann@swissfamilyrobinson.com");
		wyssEntity.setPhoneNumber("111-528-1743");
		contactService.addContact(wyssEntity);

		ContactEntity alcottEntity = new ContactEntity();
		alcottEntity.setFirstName("Louisa May");
		alcottEntity.setLastName("Alcott");
		alcottEntity.setEmail("louisa@littlewomen.org");
		alcottEntity.setPhoneNumber("112-112-1832");
		contactService.addContact(alcottEntity);
		
		ContactEntity montgomeryEntity = new ContactEntity();
		montgomeryEntity.setFirstName("L. M.");
		montgomeryEntity.setLastName("Montgomery");
		montgomeryEntity.setEmail("lucy@greengables.net");
		montgomeryEntity.setPhoneNumber("113-130-1874");
		contactService.addContact(montgomeryEntity);
	}
}