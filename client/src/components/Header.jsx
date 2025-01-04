import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { HandHeart, User, LogOut, Menu, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";


const Header = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { authUser, logout } = useAuthStore();
	const dropdownRef = useRef(null);

    useEffect(() => {
		const clickOutside = (event) => {
			const clickedElement = event.target;
			const dropdownElement = dropdownRef.current;
			
			if (!dropdownElement) return; // dropdown 不存在就返回
			
			const clickedOutside = !dropdownElement.contains(clickedElement);
			if (clickedOutside) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", clickOutside);

		return () => document.removeEventListener("mousedown", clickOutside);
	}, []);

    return (
		<header className='bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 shadow-lg'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center py-4'>
					<div className='flex items-center'>
						<Link to='/' className='flex items-center space-x-2'>
							<HandHeart className='w-8 h-8 text-white' />
							<span className='text-2xl font-bold text-white hidden sm:inline'>Tinder</span>
						</Link>
					</div>

					<div className='hidden md:flex items-center space-x-4'>
						{authUser ? (
							<div className='relative' ref={dropdownRef}>
								<button
									onClick={() => setDropdownOpen(!dropdownOpen)}
									className='flex items-center space-x-2 focus:outline-none'
								>
                                    { authUser.image?
                                        <img
                                        src={authUser.image}
                                        className='h-10 w-10 object-cover rounded-full border-2 border-white'
                                        alt='User image'
                                        />
                                        : <CircleUserRound className='text-white text-4xl' />
                                    }
									<span className='text-white font-medium'>{authUser.name}</span>
								</button>
								{dropdownOpen && (
									<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
										<Link
											to='/profile'
											className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
											onClick={() => setDropdownOpen(false)}
										>
											<User className='mr-2' size={16} />
											個人檔案
										</Link>
										<button
											onClick={logout}
											className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
										>
											<LogOut className='mr-2' size={16} />
											登出
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Link
									to='/auth'
									className='text-white hover:text-sky-200 transition duration-150 ease-in-out'
								>
									登入
								</Link>
								<Link
									to='/auth'
									className='bg-white text-sky-600 px-4 py-2 rounded-full font-medium
                   hover:bg-sky-100 transition duration-150 ease-in-out'
								>
									註冊
								</Link>
							</>
						)}
					</div>

					<div className='md:hidden'>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='text-white focus:otline-none'
						>
							<Menu className='size-6' />
						</button>
					</div>
				</div>
			</div>

			{/* 手機 menu */}

			{mobileMenuOpen && (
				<div className='md:hidden bg-sky-600'>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
						{authUser ? (
							<>
								<Link
									to='/profile'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									個人檔案
								</Link>
								<button
									onClick={() => {
										logout();
										setMobileMenuOpen(false);
									}}
									className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-700'
								>
									登出
								</button>
							</>
						) : (
							<>
								<Link
									to='/auth'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									登入
								</Link>
								<Link
									to='/auth'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									註冊
								</Link>
							</>
						)}
					</div>
				</div>
			)}
		</header>
    )
}

export default Header;