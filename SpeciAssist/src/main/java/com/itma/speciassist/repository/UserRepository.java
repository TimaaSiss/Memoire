package com.itma.speciassist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itma.speciassist.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findById(Integer id);


}