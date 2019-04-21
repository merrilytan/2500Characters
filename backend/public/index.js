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
                    <form action="/auth/register" method="POST">
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
                    <button type="submit" class="btn btn-primary btn-block">
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