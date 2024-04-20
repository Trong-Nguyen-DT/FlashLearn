package com.dt.flashlearn.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long>{
        
    Optional<UserEntity> findUserByDeletedFalseAndEmail(String email);
}
