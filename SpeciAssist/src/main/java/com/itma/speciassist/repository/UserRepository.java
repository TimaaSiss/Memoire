package com.itma.speciassist.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itma.speciassist.model.Role;
import com.itma.speciassist.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findById(Integer id);
	
	 Optional<User> findByUsername(String username);

	 @Query("SELECT u.role FROM User u WHERE u.username = :username")
	    Role findRoleByUsername(String username);

	boolean existsByUsername(String username);

	

	
	
	

}