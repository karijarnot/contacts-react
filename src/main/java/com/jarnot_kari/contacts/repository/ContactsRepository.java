package com.jarnot_kari.contacts.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.jarnot_kari.contacts.entity.ContactEntity;

public interface ContactsRepository extends PagingAndSortingRepository<ContactEntity, Long> {

   List<ContactEntity> findByFirstNameContainingIgnoreCaseAndLastNameContainingIgnoreCase(@Param("firstName") String firstName, @Param("lastName") String lastName);
   
   List<ContactEntity> findByFirstNameContainingIgnoreCase(@Param("firstName") String firstName);
}
