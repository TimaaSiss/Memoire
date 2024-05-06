package com.itma.speciassist.dto;

import com.itma.speciassist.model.Role;

public record CredentialsDto(String username, char[] password, Role role) {
	public Role getRole() {
        return role;
    }

	
}
