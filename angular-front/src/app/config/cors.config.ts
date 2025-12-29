// Configuration CORS pour les microservices

export const CORS_CONFIG = {
  customerService: 'http://localhost:8081',
  inventoryService: 'http://localhost:8082',
  billingService: 'http://localhost:8083'
};

export const API_ENDPOINTS = {
  customers: `${CORS_CONFIG.customerService}/api/customers`,
  products: `${CORS_CONFIG.inventoryService}/api/products`,
  bills: `${CORS_CONFIG.billingService}/api/bills`
};

/*
 * Configuration CORS requise dans chaque microservice Spring Boot :
 * 
 * @SpringBootApplication
 * public class YourServiceApplication {
 *   @Bean
 *   public WebMvcConfigurer corsConfigurer() {
 *     return new WebMvcConfigurer() {
 *       @Override
 *       public void addCorsMappings(CorsRegistry registry) {
 *         registry.addMapping("/api/**")
 *           .allowedOrigins("http://localhost:4200")
 *           .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
 *           .allowedHeaders("*")
 *           .allowCredentials(true)
 *           .maxAge(3600);
 *       }
 *     };
 *   }
 * }
 */
