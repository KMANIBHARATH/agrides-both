package com.example.aws.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.aws.dao.UserDao;
import com.example.aws.models.Users;

@Service
public class UserService {
	@Autowired
	UserDao Userdao;
	public Object postData(String email, Integer id, String name) {
		Users user =new Users();
		user.setEmail(email);
		user.setId(id);
		user.setName(name);
		return Userdao.save(user);
	}
	public boolean deleteUser(Integer id) {
		// TODO Auto-generated method stub
		if (Userdao.existsById(id)) {
			Userdao.deleteById(id);
			return true;
		}
		return false;
	}
	public Object getAllUsers() {
		return Userdao.findAll();
	}
	
	public Users getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}
	public Users getUserById(Integer id) {
	    return Userdao.findById(id).orElse(null);
	}


}