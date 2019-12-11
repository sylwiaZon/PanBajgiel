package tests.repositories;

import com.Main;
import com.models.User;
import com.repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tests.helpers.UserHelper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@JdbcTest
public class UserRepositoryTests {

    private List<User> users;
    private MockMvc mockMvc;
    private UserHelper userHelper;

    @Mock
    Connection connection;

    @Mock
    Statement stmt;

    @InjectMocks
    UserRepository userRepository;

    @Mock
    JdbcTemplate jdbcTemplate;

    @Before
    public void setUp() throws SQLException {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(userRepository)
                .build();
        users = new ArrayList<>();
        users.add(userHelper.getUser());
    }

    @Test
    public void login_should_return_user() throws SQLException {
        when(jdbcTemplate.getDataSource().getConnection()).thenReturn(connection);
        when(jdbcTemplate.query(anyString(), (RowMapper<Object>) anyObject())).thenReturn(Collections.singletonList(users));
        User userResp = userRepository.login(users.get(0).getLogin(),users.get(0).getPassword());
        assertEquals(userResp,users.get(0));
    }
}
