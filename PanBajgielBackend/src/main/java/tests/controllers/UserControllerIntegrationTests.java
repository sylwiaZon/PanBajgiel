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
import tests.helpers.UserHelper;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


public class UserControllerIntegrationTests {

    private UserHelper userHelper;
    private MockMvc mockMvc;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    @Before
    public void init(){
        UserHelper userHelper = new UserHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(userController)
                .build();
    }

    @Test
    public void get_user() throws Exception {
        User responseUser = this.userHelper.getUser();
        when(userRepository.getUser(responseUser.getLogin())).thenReturn(responseUser);
        mockMvc.perform(get("/user?login={login}",responseUser.getLogin()).header("Origin","*")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.login").value(responseUser.getLogin()))
                .andExpect(jsonPath("$.password").value(responseUser.getPassword()))
                .andExpect(jsonPath("$.name").value(responseUser.getName()));
        verify(userRepository, times(1)).getUser(responseUser.getLogin());
        verifyNoMoreInteractions(userRepository);

    }
}