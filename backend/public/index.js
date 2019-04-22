/**
 * User CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const controlUser = () => {

    //Render appropriate views based on URL
    const view = window.location.hash.replace('#', '');

    if(view !== '' && view !== 'register'){
        window.location.hash = '#';

    } else if (view === ''){
        document.querySelector('.container').innerHTML = `
            <div class="row mt-5">
                <div class="col-md-6 m-auto">
                <div class="card card-body">
                    <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>
                    <div class="message">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        class="form-control"
                        placeholder="Enter Email"
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        class="form-control"
                        placeholder="Enter Password"
                        />
                    </div>
                    <button class="btn btn-primary btn-block btn-login">Login</button>
                    </form>
                    <p class="lead mt-4">
                    No Account? <a href="#register">Register</a>
                    </p>
                </div>
                </div>
            </div>
        `;

    } else if (view === 'register') {
        document.querySelector('.container').innerHTML = `
            <div class="row mt-5">
                <div class="col-md-6 m-auto">
                <div class="card card-body">
                    <div class="message">
                    </div>
                    <h1 class="text-center mb-3">
                    <i class="fas fa-user-plus"></i> Register
                    </h1>
                    <div class="message">
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input
                        type="name"
                        id="name"
                        name="name"
                        class="form-control"
                        placeholder="Enter Name"
                        />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        class="form-control"
                        placeholder="Enter Email"
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        class="form-control"
                        placeholder="Create Password"
                        />
                    </div>
                    <div class="form-group">
                        <label for="password2">Confirm Password</label>
                        <input
                        type="password"
                        id="password2"
                        name="password2"
                        class="form-control"
                        placeholder="Confirm Password"
                        />
                    </div>
                    <button class="btn btn-primary btn-block btn-register">
                        Register
                    </button>
                    </form>
                    <p class="lead mt-4">Have An Account? <a href="#login">Login</a></p>
                </div>
                </div>
            </div>
        `;
    } 
}

/**
 * Event Listeners //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlUser));

document.querySelector('.container').addEventListener('click', e => {

    //Register -----------------------------------------------------------------------------------------------------
    if (e.target.matches('.btn-register')) {

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
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Please fill in all fields
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;

            document.querySelector('.message').insertAdjacentHTML('afterbegin', markup); 
        }

        // Check passwords match
        if(password != password2){
            errors++;
            const markup = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Passwords do not match
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;

            document.querySelector('.message').insertAdjacentHTML('afterbegin', markup); 
        }

        // Check password length
        if(password.length < 6 ){
            errors++;
            const markup = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Password should be at least 6 characters
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;

            document.querySelector('.message').insertAdjacentHTML('afterbegin', markup); 
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
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        You are registered and can now log in!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
                
            }) .catch(function (error) {
                if(error.response){
                    document.querySelector('.message').innerHTML = `
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            ${error.response.data.message}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `;
                } else {
                    document.querySelector('.message').innerHTML = `
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            Something went wrong :(
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `;
                }


            }); 
        }   

    //Login -----------------------------------------------------------------------------------------------------
    } else if (e.target.matches('.btn-login')) {

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
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        ${error.response.data.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
                document.querySelector('.message').insertAdjacentHTML('afterbegin', markup); 
           }else{
               alert(error)
           }
        });  
    } 
}); 



