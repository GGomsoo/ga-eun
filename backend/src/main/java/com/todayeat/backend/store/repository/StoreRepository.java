package com.todayeat.backend.store.repository;

import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long>, StoreRepositoryQueryDSL {

    Optional<Store> findByIdAndDeletedAtIsNull(Long storeId);

    Optional<Store> findByIdAndSellerAndDeletedAtIsNull(Long MenuId, Seller seller);
}
