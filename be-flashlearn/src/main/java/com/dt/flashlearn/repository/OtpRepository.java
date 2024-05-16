package com.dt.flashlearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dt.flashlearn.entity.OtpEntity;

public interface OtpRepository extends JpaRepository<OtpEntity, Long>{
    
}
