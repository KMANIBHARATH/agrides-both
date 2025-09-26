package com.example.aws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.aws.models.Users;
import com.example.aws.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:5173/")
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	UserService userService;
//	@GetMapping("/message")
//		public Object first() {
//		return "hi";
//	}
	@PostMapping("/post")
	public Object postData(@RequestBody Users user) {
		return userService.postData(
			user.getEmail(),
			user.getId(),
			user.getName()
				);
	}
	@DeleteMapping("/delete/{id}")
	public String deleteUser(@PathVariable Integer id) {
		boolean isDeleted = userService.deleteUser(id);
		if(isDeleted) {
			return "User with Id " + id + "was successfully deleted.";
		}
		else {
			return "user with id " + id + "not found.";
		}
	}
	@GetMapping("/all")
	public Object getAllUsers() {
		return userService.getAllUsers();
	}
	
}