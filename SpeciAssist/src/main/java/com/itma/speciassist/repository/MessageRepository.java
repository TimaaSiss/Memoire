package com.itma.speciassist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itma.speciassist.model.Mentor;
import com.itma.speciassist.model.Message;
import com.itma.speciassist.model.User;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
	List<Message> findByReceiver(User user);

	List<Message> findBySender(User user);

}
