import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { t } = useTranslation();

	const { login, loading } = useAuthStore();
	const navigate = useNavigate();

	return (
		<form
			className='space-y-6'
			onSubmit={async (e) => {
				e.preventDefault();
				const success = await login({ email, password });
				if(success) navigate('/match');
			}}
		>
			<div>
				<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
					Email
				</label>
				<div className='mt-1'>
					<input
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm'
					/>
				</div>
			</div>

			<div>
				<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
					Password
				</label>
				<div className='mt-1'>
					<input
						id='password'
						name='password'
						type='password'
						autoComplete='current-password'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm'
					/>
				</div>
			</div>

			<button
				type='submit'
				className={`w-full flex justify-center py-2 px-4 border border-transparent 
					rounded-md shadow-sm text-sm font-medium text-white ${
						loading
							? "bg-rose-400 cursor-not-allowed"
							: "bg-rose-400 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
					}`}
				disabled={loading}
			>
				{loading ? t("auth.logining") : t("auth.login")}
			</button>
		</form>
	);
};
export default LoginForm;
