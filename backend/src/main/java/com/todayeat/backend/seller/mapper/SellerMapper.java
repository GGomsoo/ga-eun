package com.todayeat.backend.seller.mapper;

import com.todayeat.backend.seller.dto.request.SignupSellerRequest;
import com.todayeat.backend.seller.entity.Seller;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring")
public interface SellerMapper {

    SellerMapper INSTANCE = Mappers.getMapper(SellerMapper.class);

    @Mapping(target = "role", constant = "ROLE_SELLER")
    @Mapping(target = "password", qualifiedByName = "encodePassword")
    Seller signupSellerRequestToSeller(SignupSellerRequest signupSellerRequest, @Context PasswordEncoder passwordEncoder);

    @Named("encodePassword")
    default String encodePassword(String password, @Context PasswordEncoder passwordEncoder) {

        return passwordEncoder.encode(password);
    }
}
