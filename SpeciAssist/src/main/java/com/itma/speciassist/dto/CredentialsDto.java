package com.itma.speciassist.dto;

import com.itma.speciassist.model.Role;

public record CredentialsDto(String username, char[] password, Role role) {
	public Role getRole() {
        return role;
    }

	public String getUsername() {
		// TODO Auto-generated method stub
		return null;
	}

	public char[] getPassword() {
		// TODO Auto-generated method stub
		return null;
	}

	
}
