package com.todayeat.backend.seller.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.seller.dto.request.SignupSellerRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "판매자 auth")
@RequestMapping("/api/auth")
public interface SellerAuthControllerDocs {

    @Operation(summary = "판매자 회원 가입")
    @ApiResponse(responseCode = "200", description = "성공", useReturnTypeSchema = true)
    @PostMapping()
    public SuccessResponse signup(@RequestBody @Valid SignupSellerRequest signupSellerRequest);
}
