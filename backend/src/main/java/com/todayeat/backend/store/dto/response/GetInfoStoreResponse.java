package com.todayeat.backend.store.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Schema(name = "가게 정보, 원산지 조회")
public class GetInfoStoreResponse {

    @Schema(description = "상호명", example = "상호")
    private String registeredName;

    @Schema(description = "사업자 등록번호", example = "0123456789")
    private String registeredNo;

    @Schema(description = "대표자명", example = "대표자")
    private String bossName;

    @Schema(description = "주소", example = "OO OO시 O로 OOO")
    private String address;

    @Schema(description = "위도", example = "36.936936")
    private BigDecimal latitude;

    @Schema(description = "경도", example = "124.816326")
    private BigDecimal longitude;

    @Schema(description = "전화번호", example = "01012345678")
    private String tel;

    @Schema(description = "가게명", example = "가게")
    private String name;

    @Schema(description = "영업 시간", example = "24시")
    private String operatingTime;

    @Schema(description = "휴무일", example = "연중무휴")
    private String holiday;

    @Schema(description = "원산지", example = "국산")
    private String originCountry;

    @Schema(description = "소개", example = "방씀다")
    private String introduction;
}
