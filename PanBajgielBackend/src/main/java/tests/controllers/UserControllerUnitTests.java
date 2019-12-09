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
    public void get_user() throws Exception {
        User user = userHelper.getUser();
        when(userRepository.getUser(user.getLogin())).thenReturn(user);
        ResponseEntity<User> responseUser = userController.getUser(user.getLogin());
        ResponseEntity<User> expectedResponse = new ResponseEntity<User>(user, HttpStatus.OK);
        assertEquals(responseUser,expectedResponse);
    }
}