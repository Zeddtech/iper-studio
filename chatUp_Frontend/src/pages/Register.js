// import bg from "../asset/insta-2.jpg";
// import logo from "../asset/logo.png";
// import { useRef, useState, useEffect } from "react";
// import { useGcontex } from "../hooks/ContextProvider";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { client } from "../sanityConfig";
// import useLocalStorage from "../hooks/useLocalStorage";
// const initvalue = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   Cpassword: "",
// };
// const Register = () => {
//   const [ErrMsg, setErrMsg] = useState("hhfgf");
//   const [value, setValue] = useLocalStorage("register", initvalue);

//   const { setAuth } = useGcontex();

//   const navigate = useNavigate();

//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const userRef = useRef();

//   // useEffect(() => {
//   //   setErrMsg("");
//   // }, [value]);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     try {
//       // setValue(initvalue);

//       client
//         .createIfNotExists({
//           _type: "user",
//           email: "sop1%&^",
//           _id: "jshg",
//         })
//         .then(res => console.log(res));

//       // navigate(from, { replace: true });
//     } catch (err) {
//       if (!err?.response) {
//         setErrMsg("No Server Response");
//       } else if (err.response?.status === 400) {
//         setErrMsg("Missing Username or Password");
//       } else if (err.response?.status === 401) {
//         setErrMsg("Unauthorized");
//       } else {
//         setErrMsg("Login Failed");
//       }
//     }
//   };

//   function handleChange(key, text) {
//     setValue(prev => ({ ...value, [key]: text }));
//   }

//   return (
//     <section className="bg-white">
//       <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
//         <section className="relative flex h-32 items-center bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
//           <img
//             alt="Night"
//             src={bg}
//             className="absolute inset-0 h-full w-full object-cover opacity-80"
//           />

//           <div className="hidden lg:relative lg:block lg:p-12 lg:mt-20">
//             <Link className="block text-white" to="/">
//               <span className="sr-only">Home</span>
//               <img src={logo} alt="logo" className="h-10 sm:h-12" />
//             </Link>

//             <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
//               Welcome to Socialley 🦑
//             </h2>

//             <p className="mt-4 leading-relaxed text-white/90">
//               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
//               nam dolorum aliquam, quibusdam aperiam voluptatum.
//             </p>
//           </div>
//         </section>

//         <main
//           aria-label="Main"
//           className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
//         >
//           <div className="max-w-xl lg:max-w-3xl">
//             <div className="relative -mt-16 block lg:hidden">
//               <Link
//                 className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
//                 to="/"
//               >
//                 <span className="sr-only">Home</span>
//                 <img src={logo} alt="logo" className="h-10 sm:h-12" />
//               </Link>

//               <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
//                 Welcome to Socialley 🦑
//               </h1>

//               <p className="mt-4 leading-relaxed text-gray-500">
//                 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//                 Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
//               </p>
//             </div>
//             <div className="flex items-center justify-center mt-8 mb-4">
//               <p
//                 aria-live="assertive"
//                 role="alert"
//                 className={
//                   ErrMsg
//                     ? "bg-red-100 border border-red-400 text-red-700 px-4 py-1 text-sm rounded relative"
//                     : "invisible"
//                 }
//               >
//                 {ErrMsg}
//               </p>
//             </div>

//             <form className=" grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
//               <div className="col-span-6 sm:col-span-3">
//                 <label className="block">
//                   <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
//                     FirstName
//                   </span>
//                   <input
//                     type="text"
//                     name="firstName"
//                     id="firstName"
//                     ref={userRef}
//                     autoComplete="on"
//                     value={value.firstName}
//                     onChange={e => handleChange("firstName", e.target.value)}
//                     required
//                     className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
//                   />
//                 </label>
//               </div>
//               <div className="col-span-6 sm:col-span-3">
//                 <label className="block">
//                   <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
//                     LastName
//                   </span>
//                   <input
//                     type="text"
//                     name="lastName"
//                     id="lastName"
//                     autoComplete="on"
//                     onChange={e => handleChange("lastName", e.target.value)}
//                     value={value.lastName}
//                     required
//                     className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
//                   />
//                 </label>
//               </div>
//               <div className="col-span-6">
//                 <label className="block">
//                   <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
//                     Email
//                   </span>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     autoComplete="on"
//                     onChange={e => handleChange("email", e.target.value)}
//                     value={value.email}
//                     required
//                     className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
//                   />
//                 </label>
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label className="block">
//                   <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
//                     Password
//                   </span>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     onChange={e => handleChange("password", e.target.value)}
//                     value={value.password}
//                     required
//                     className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
//                   />
//                 </label>
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label className="block">
//                   <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
//                     Confirm Password
//                   </span>
//                   <input
//                     type="password"
//                     name="Cpassword"
//                     id="Cpassword"
//                     onChange={e => handleChange("Cpassword", e.target.value)}
//                     value={value.Cpassword}
//                     required
//                     className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
//                   />
//                 </label>
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="MarketingAccept" className="flex gap-4">
//                   <input
//                     type="checkbox"
//                     id="MarketingAccept"
//                     name="marketing_accept"
//                     className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
//                   />

//                   <span className="text-sm text-gray-700">
//                     I want to receive emails about events, product updates and
//                     company announcements.
//                   </span>
//                 </label>
//               </div>

//               <div className="col-span-6">
//                 <p className="text-sm text-gray-500">
//                   By creating an account, you agree to our
//                   <a href="#" className="text-gray-700 underline">
//                     terms and conditions
//                   </a>
//                   and
//                   <a href="#" className="text-gray-700 underline">
//                     privacy policy
//                   </a>
//                 </p>
//               </div>

//               <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//                 <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
//                   Login
//                 </button>

//                 <p className="mt-4 text-sm text-gray-500 sm:mt-0">
//                   Don't have an account?
//                   <Link to={"/register"} className="text-gray-700 underline">
//                     Register
//                   </Link>
//                   .
//                 </p>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//     </section>
//   );
// };

// export default Register;
