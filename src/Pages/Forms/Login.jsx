import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import login from "../../assets/Forms/medical-banner-with-stethoscope.jpg";
import facebook from "../../assets/Forms/icons8-facebook-48.png";
import google from "../../assets/Forms/icons8-google-48.png";

const Login = () => {
    return (
        <div className="login-page relative z-0 overflow-x-hidden">
            <div className="container min-h-screen py-10 lg:h-screen lg:max-h-screen flex justify-center items-center md:items-center md:justify-start px-5 mx-auto gap-5">
                <div className="form w-full md:w-1/2" >
                    <img src={logo} alt="" className="w-20 h-20 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
                    <form>
                        <div className="form-group flex flex-col gap-2">
                            <div className="email">
                                <label htmlFor="email" className="block mb-2">Email:</label>
                                <input type="email" id="email" name="email" required className="w-full border-2 outline-none border-gray-300 text-lg px-5 py-2 rounded-2xl bg-blue-50 focus:border-blue-500 focus:shadow-blue" placeholder="Email" />
                            </div>
                            <div className="password">
                                <label htmlFor="password" className="block mb-2">Password:</label>
                                <input type="password" id="password" name="password" required className="w-full border-2 outline-none border-gray-300 text-lg px-5 py-2 rounded-2xl bg-blue-50 focus:border-blue-500 focus:shadow-blue" placeholder="Password" />
                            </div>
                        </div>
                        <div className="my-2 ml-3 text-end ">
                            <p><Link to="/forgot-password" className="text-blue-500 hover:underline">Forget Password?</Link></p>
                        </div>
                    </form>
                    <button type="submit" className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 w-full">Log In</button>
                    <div className="other-way-to-signup">
                        <p className="text-center my-2 text-gray-500">Or Log In with</p>
                        <div className="flex justify-center gap-6">
                            <button className="cursor-pointer rounded-full p-1 bg-white border border-gray-300 hover:shadow-lg transition-shadow duration-300">
                                <img src={google} alt="Google" className="w-10 h-10" />
                            </button>
                            <button className="cursor-pointer rounded-full p-1 bg-white border border-gray-300 hover:shadow-lg transition-shadow duration-300">
                                <img src={facebook} alt="Facebook" className="w-10 h-10" />
                            </button>
                        </div>
                    </div>
                </div>
                <img src={login} alt="" className="min-h-screen h-full hidden md:block absolute top-0 -right-10 w-1/2 object-cover -z-1" />
            </div>
        </div>
    )
}

export default Login;
