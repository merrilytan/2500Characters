/**
 * Auth CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const controlAuth = () => {


    //Render appropriate views based on URL
    const view = window.location.hash.replace('#', '');

    if(view !== 'login' && view !== 'register'){
        window.location.hash = '#login';

    } else if (view === 'login'){
        document.querySelector('.container').innerHTML = `
            <div class="row mt-5">
                <div class="col-md-6 m-auto">
                <div class="card card-body">
                    <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>
                    <form action="/auth" method="POST">
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
                    <button type="submit" class="btn btn-primary btn-block">Login</button>
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
                    <h1 class="text-center mb-3">
                    <i class="fas fa-user-plus"></i> Register
                    </h1>
                    
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
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlAuth));

document.querySelector('.container').addEventListener('click', e => {
    if (e.target.matches('.btn-register')) {

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;  
            const password = document.getElementById('password').value;
            const password2 = document.getElementById('password2').value;

            console.log('name', typeof name);
            console.log('email', typeof email);
            console.log('password', typeof password);
            console.log('password2', typeof password2);

            const dataJSON = {
                name: name,
                email: email,
                password: password, 
                password2: password2
            }

            const encoded = encodeURIComponent(JSON.stringify(dataJSON));
            console.log(encoded);

            //name=Jessica+Smith&email=jsmith%40gmail.com&password=test1234&password2=test1234


            // Send a POST request
            axios({
                method: 'post',
                url: `${window.location.origin}/auth/register`,
                data: dataJSON,
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                console.log('btn-login', response);
            });
/*             axios.post(`${window.location.origin}/auth/register`, {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log('btn-login', response);
            })
            .catch(function (error) {
            console.log('btn-register', error);
            });  */


   
    } 


   /* else if (e.target.matches('.btn-login')) {
        console.log('hehehehhee');
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;  
        
            console.log('email', email);
            console.log('password', password);


            axios.post(`${window.location.origin}/auth`, {
                email: email,
                password: password
              });
              .then(function (response) {
                console.log('btn-login', response);
              })
              .catch(function (error) {
                console.log('btn-register', error);
              }); 

    } */
}); 