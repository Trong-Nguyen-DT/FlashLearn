package com.dt.flashlearn.converter;

import java.util.ArrayList;
import java.util.List;

import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.model.User;
import com.dt.flashlearn.security.userprical.UserPrinciple;

public class UserConverter {
    public static User toModel(UserEntity entity) {
        User user = new User();
        user.setId(entity.getId());
        user.setEmail(entity.getEmail());
        user.setName(entity.getName());
        user.setAvatar(entity.getAvatar() != null ? entity.getAvatar() : null);
        user.setPhone(entity.getPhone() != null ? entity.getPhone() : null);
        return user;
    }

    public static List<Object> convertToObjects(List<User> users) {
        List<Object> objects = new ArrayList<>();
        for (User user : users) {
            objects.add(user);
        }
        return objects;
    }

    public static Object convertToObject(User user) {
        return user;
    }

    public static User userPrincipleToModel(UserPrinciple principle) {
        User user = new User();
        user.setId(principle.getId());
        user.setEmail(principle.getEmail());
        user.setName(principle.getName());
        user.setPhone(principle.getPhone() == null ? null : principle.getPhone());
        return user;
    }
}
