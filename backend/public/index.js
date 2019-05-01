/**
 * User CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const controlUser = () => {

    //Render appropriate views based on URL
    const view = window.location.hash.replace('#', '');

    if(view !== '' && view !== 'signup'){
        window.location.hash = '#';

    } else if (view === ''){

        const change = () => {
            document.querySelector('.container').innerHTML = `
                <div class="form-container appear">
                    <div class="form-inner">
                        <!-- <div class="form-title"> 
                            LOGIN
                        </div> -->
                        <div class="message">
                        </div>
                        <div class="form-group">
                            <input
                            type="email"
                            id="email"
                            name="email"
                            class="form-control"
                            placeholder="Enter Email"
                            />
                        </div>
                        <div class="form-group">
                            <input
                            type="password"
                            id="password"
                            name="password"
                            class="form-control"
                            placeholder="Enter Password"
                            />
                        </div
                    </div>
                    <button class="btn btn-login">Login</button>
                    <div class="comment">
                        No Account? &nbsp&nbsp<a href="#signup">Sign Up</a>
                    </div>
                </div>
            `;
        }

        if(document.querySelector('.form-container')){
            document.querySelector('.form-container').classList.add('disappear');
            setTimeout(change, 400);
        } else {
            change();
        }

    } else if (view === 'signup') {

        const change = () => {
            document.querySelector('.container').innerHTML = `
                <div class="form-container appear">
                <div class="form-inner">
                    <!-- <div class="form-title"> 
                        REGISTER
                    </div> -->
                    <div class="message">
                    </div>
                    <div class="form-group">
                        <input
                        type="name"
                        id="name"
                        name="name"
                        class="form-control"
                        placeholder="Enter Name"
                        />
                    </div>
                    <div class="form-group">
                        <input
                        type="email"
                        id="email"
                        name="email"
                        class="form-control"
                        placeholder="Enter Email"
                        />
                    </div>
                    <div class="form-group">
                        <input
                        type="password"
                        id="password"
                        name="password"
                        class="form-control"
                        placeholder="Create Password"
                        />
                    </div>
                    <div class="form-group">
                        <input
                        type="password"
                        id="password2"
                        name="password2"
                        class="form-control"
                        placeholder="Confirm Password"
                        />
                    </div>
                    <button class="btn btn-register">Sign Up</button>
                    <div class="comment">
                        Have an account? &nbsp&nbsp<a href="#login">Login</a>
                    </div>
                </div>
                </div>
            `;
        }

        if(document.querySelector('.form-container')){
            document.querySelector('.form-container').classList.add('disappear');
            setTimeout(change, 400);
        } else {
            change();
        }
    } 
}

/**
 * Event Listeners //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlUser));



const register = () => {
    document.querySelector('.message').innerHTML = '';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;  
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    //Validation

    let errors = 0;
    // Check required fields
    if(!name || !email || !password || !password2) {
        errors++;
        const markup = `
            <div class="alert alert-warning appear">
                <div class ="alert-content">
                    Please fill in all fields
                </div>
                <!-- <button class="close"">
                    <span aria-hidden="true">&times;</span>
                </button>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> -->
            </div>
        `;

        document.querySelector('.message').insertAdjacentHTML('afterbegin', markup); 
    }

    // Check passwords match
    if(password != password2){
        errors++;
        const markup = `
            <div class="alert alert-warning appear">
                <div class ="alert-content">
                    Passwords do not match
                </div>
            </div>
        `;

        document.querySelector('.message').insertAdjacentHTML('afterbegin', markup); 
    }

    // Check password length
    if(password.length < 6 ){
        errors++;
        const markup = `
            <div class="alert alert-warning appear">
                <div class ="alert-content">
                    Password should be at least 6 characters
                </div>
            </div>
        `; 
    }

    if(errors === 0){
        const data = {
            name: name,
            email: email,
            password: password, 
            password2: password2
        }

        // Send a POST request
        axios({
            method: 'post',
            url: `${window.location.origin}/user/register`,
            data: data,
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            document.querySelector('.message').innerHTML = `
                <div class="alert alert-success appear">
                    <div class ="alert-content">
                        You are registered and can now log in!
                    </div>
                </div>
            `;
            
        }) .catch(function (error) {
            if(error.response){
                document.querySelector('.message').innerHTML = `
                    <div class="alert alert-warning appear">
                        <div class ="alert-content">
                            ${error.response.data.message}
                        </div>
                    </div>
                `;
            } else {
                document.querySelector('.message').innerHTML = `
                    <div class="alert alert-warning appear">
                        <div class ="alert-content">
                            Something went wrong :(
                        </div>
                    </div>
                `;
            }


        }); 
    }   
}

const login = () => {
    document.querySelector('.message').innerHTML = '';
        
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;  

    const data = {
        email: email,
        password: password
    }

    // Send a POST request
    axios({
        method: 'post',
        url: `${window.location.origin}/user/`,
        data: data,
        headers: { "Content-Type": "application/json" }
    }).then(function (response) {
        window.location = `${window.location.origin}`;
    }).catch( (error) => {
        if(error.response) {
            const markup = `
                <div class="alert alert-warning appear">
                    <div class ="alert-content">
                        ${error.response.data.message}
                    </div>
                </div>
            `;
            document.querySelector('.message').insertAdjacentHTML('afterbegin', markup); 
        }else{
            alert(error)
        }
    }); 
} 

document.querySelector('.container').addEventListener('click', e => {
    //Register -----------------------------------------------------------------------------------------------------
    if (e.target.matches('.btn-register')) {
        register();
        
    //Login -----------------------------------------------------------------------------------------------------
    } else if (e.target.matches('.btn-login')) {
        login();
    } 
}); 

document.querySelector('.btn-register').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        register();
    }
});

document.querySelector('.btn-login').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        login();
    }
});

