package com.jarnot_kari.contacts.db;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DBConfig {
	
    @Bean
	public DataSource dataSource() {
	        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
	        dataSourceBuilder.driverClassName("org.sqlite.JDBC");
	        dataSourceBuilder.url("jdbc:sqlite:contacts.db");
	        return dataSourceBuilder.build();   
	}
}
