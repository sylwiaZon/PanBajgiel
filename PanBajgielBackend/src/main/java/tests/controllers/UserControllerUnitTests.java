package tests.controllers;

import com.Controllers.UserController;
import com.Models.User;
import com.Repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tests.helpers.UserHelper;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;


public class UserControllerUnitTests {

    private MockMvc mockMvc;
    private UserHelper userHelper;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    @Before
    public void init(){
        this.userHelper = new UserHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(userController)
                .build();
    }

    @Test
    public void get_user_should_return_user() throws Exception {
        User user = userHelper.getUser();
        when(userRepository.getUser(user.getLogin())).thenReturn(user);
        ResponseEntity<User> responseUser = userController.getUser(user.getLogin());
        ResponseEntity<User> expectedResponse = new ResponseEntity<User>(user, HttpStatus.OK);
        assertEquals(responseUser,expectedResponse);
    }

    @Test
    public void get_user_should_return_NOT_FOUND() throws Exception {
        User user = userHelper.getUser();
        when(userRepository.getUser(user.getLogin())).thenReturn(null);
        ResponseEntity<User> responseUser = userController.getUser(user.getLogin());
        ResponseEntity<User> expectedResponse = new ResponseEntity(HttpStatus.NOT_FOUND);
        assertEquals(responseUser,expectedResponse);
    }

    @Test
    public void login_should_return_logged_user() throws Exception {
        User user = userHelper.getUser();
        when(userRepository.login(user.getLogin(),user.getPassword())).thenReturn(user);
        ResponseEntity<User> responseUser = userController.login(user.getLogin(),user.getPassword());
        ResponseEntity<User> expectedResponse = new ResponseEntity<User>(user, HttpStatus.OK);
        assertEquals(responseUser,expectedResponse);
    }

    @Test
    public void login_should_return_NOT_FOUND() throws Exception {
        User user = userHelper.getUser();
        when(userRepository.login(user.getLogin(),user.getPassword())).thenReturn(null);
        ResponseEntity<User> responseUser = userController.login(user.getLogin(),user.getPassword());
        ResponseEntity<User> expectedResponse = new ResponseEntity(HttpStatus.NOT_FOUND);
        assertEquals(responseUser,expectedResponse);
    }

    @Test
    public void register_should_return_registered_user() throws Exception {
        User user = userHelper.getUser();
        when(userRepository.register(user)).thenReturn(user);
        ResponseEntity<User> responseUser = userController.register(user);
        ResponseEntity<User> expectedResponse = new ResponseEntity<User>(user, HttpStatus.OK);
        assertEquals(responseUser,expectedResponse);
    }

    @Test
    public void register_should_return_CONFLICT() throws Exception {
        User user = userHelper.getUser();
        when(userRepository.register(user)).thenReturn(null);
        ResponseEntity<User> responseUser = userController.register(user);
        ResponseEntity<User> expectedResponse = new ResponseEntity(HttpStatus.CONFLICT);
        assertEquals(responseUser,expectedResponse);
    }

    @Test
    public void delete_should_return_OK() throws Exception {
        User user = userHelper.getUser();
        when(userRepository.delete(user.getLogin())).thenReturn(true);
        ResponseEntity<Object> response = userController.delete(user.getLogin());
        ResponseEntity<Object> expectedResponse = new ResponseEntity(HttpStatus.OK);
        assertEquals(response,expectedResponse);
    }

    @Test
    public void delete_should_return_NOT_FOUND() throws Exception {
        User user = userHelper.getUser();
        when(userRepository.delete(user.getLogin())).thenReturn(false);
        ResponseEntity<Object> response = userController.delete(user.getLogin());
        ResponseEntity<Object> expectedResponse = new ResponseEntity(HttpStatus.NOT_FOUND);
        assertEquals(response,expectedResponse);
    }
}