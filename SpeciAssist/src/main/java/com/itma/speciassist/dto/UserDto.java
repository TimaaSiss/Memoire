package com.itma.speciassist.dto;

import com.itma.speciassist.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
	
	private Long id;
	private String nom;
	private String prenom;
	private String username;
	private String mail;
	private Role role;
	private String token;
	
	
}
