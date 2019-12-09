package tests.controllers;

import com.Controllers.UserController;
import com.Models.User;
import com.Repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


public class UserControllerTests {

    private MockMvc mockMvc;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(userController)
                .build();
    }

    @Test
    public void get_user() throws Exception {
        String login = "login@mail.com";
        String password = "password";
        String name = "name";
        Integer points = 0;
        Integer stamps = 0;
        Integer client = 1;
        User responseUser = new User(login,password,name,points,stamps,client);
        when(userRepository.getUser(login)).thenReturn(responseUser);
        mockMvc.perform(get("/user?login={login}",login).header("Origin","*")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.login").value(login))
                .andExpect(jsonPath("$.password").value(password))
                .andExpect(jsonPath("$.name").value(name));
        verify(userRepository, times(1)).getUser(login);
        verifyNoMoreInteractions(userRepository);

    }
}