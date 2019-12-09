package tests.controllers;

import ch.qos.logback.core.net.ObjectWriter;
import com.Controllers.UserController;
import com.Models.User;
import com.Repositories.UserRepository;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.apache.commons.lang3.SerializationUtils;
import org.codehaus.jackson.map.ObjectMapper;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
        userHelper = new UserHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(userController)
                .build();
    }

    @Test
    public void get_user_should_return_user() throws Exception {
        User responseUser = userHelper.getUser();
        when(userRepository.getUser(responseUser.getLogin())).thenReturn(responseUser);
        mockMvc.perform(get("/user?login={login}",responseUser.getLogin()).header("Origin","*"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.login").value(responseUser.getLogin()))
                .andExpect(jsonPath("$.password").value(responseUser.getPassword()))
                .andExpect(jsonPath("$.name").value(responseUser.getName()));
        verify(userRepository, times(1)).getUser(responseUser.getLogin());
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void get_user_should_return_NOT_FOUND() throws Exception {
        User responseUser = userHelper.getUser();
        when(userRepository.getUser(responseUser.getLogin())).thenReturn(null);
        mockMvc.perform(get("/user?login={login}",responseUser.getLogin()).header("Origin","*")).andDo(print())
                .andExpect(status().isNotFound());
        verify(userRepository, times(1)).getUser(responseUser.getLogin());
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void login_should_return_logged_user() throws Exception {
        User responseUser = userHelper.getUser();
        when(userRepository.login(responseUser.getLogin(),responseUser.getPassword())).thenReturn(responseUser);
        mockMvc.perform(get("/user/login?login={login}&password={password}",responseUser.getLogin(), responseUser.getPassword()).header("Origin","*"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.login").value(responseUser.getLogin()))
                .andExpect(jsonPath("$.password").value(responseUser.getPassword()))
                .andExpect(jsonPath("$.name").value(responseUser.getName()));
        verify(userRepository, times(1)).login(responseUser.getLogin(), responseUser.getPassword());
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void login_should_return_NOT_FOUND() throws Exception {
        User responseUser = userHelper.getUser();
        when(userRepository.login(responseUser.getLogin(),responseUser.getPassword())).thenReturn(null);
        mockMvc.perform(get("/user/login?login={login}&password={password}",responseUser.getLogin(), responseUser.getPassword()).header("Origin","*"))
                .andExpect(status().isNotFound());
        verify(userRepository, times(1)).login(responseUser.getLogin(), responseUser.getPassword());
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void register_should_return_registered_user() throws Exception {
        User responseUser = userHelper.getUser();
        when(userRepository.register(any())).thenReturn(responseUser);
        mockMvc.perform(post("/user/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(responseUser))
                    .header("Origin","*"))
                    .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.login").value(responseUser.getLogin()))
                .andExpect(jsonPath("$.password").value(responseUser.getPassword()))
                .andExpect(jsonPath("$.name").value(responseUser.getName()));
        verify(userRepository, times(1)).register(any());
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void register_should_return_CONFLICT() throws Exception {
        User responseUser = userHelper.getUser();
        when(userRepository.register(any())).thenReturn(null);
        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(responseUser))
                .header("Origin","*"))
                .andDo(print())
                .andExpect(status().isConflict());
        verify(userRepository, times(1)).register(any());
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void delete_should_return_OK() throws Exception {
        User responseUser = userHelper.getUser();
        when(userRepository.delete(responseUser.getLogin())).thenReturn(true);
        mockMvc.perform(delete("/user?login={login}",responseUser.getLogin()).header("Origin","*"))
                .andExpect(status().isOk());
        verify(userRepository, times(1)).delete(responseUser.getLogin());
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void delete_should_return_NOT_FOUND() throws Exception {
        User responseUser = userHelper.getUser();
        when(userRepository.delete(responseUser.getLogin())).thenReturn(false);
        mockMvc.perform(delete("/user?login={login}",responseUser.getLogin()).header("Origin","*"))
                .andExpect(status().isNotFound());
        verify(userRepository, times(1)).delete(responseUser.getLogin());
        verifyNoMoreInteractions(userRepository);
    }
}