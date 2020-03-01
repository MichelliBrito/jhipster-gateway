package com.jhipster.blog.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link BlogSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class BlogSearchRepositoryMockConfiguration {

    @MockBean
    private BlogSearchRepository mockBlogSearchRepository;

}
