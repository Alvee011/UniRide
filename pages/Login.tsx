import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6 pt-8">
        <button onClick={() => navigate('/home')} className="p-2 hover:bg-gray-50 rounded-full inline-block">
            <ArrowLeft size={24} className="text-slate-800" />
        </button>
      </div>

      <div className="flex-1 px-8 flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome to GoCab</h1>
        <p className="text-lg font-medium text-center text-slate-600 mb-10">Login now!</p>

        <div className="space-y-6">
            {/* Email */}
            <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">Email</label>
                <div className="relative">
                    <input 
                        type="email" 
                        placeholder="user.alvee@gmail.com" 
                        className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    />
                    <div className="absolute left-4 top-4 text-slate-400">
                        <Mail size={20} />
                    </div>
                </div>
            </div>

            {/* Password */}
            <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">Password</label>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="********" 
                        className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    />
                    <div className="absolute left-4 top-4 text-slate-400">
                        <Lock size={20} />
                    </div>
                    <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>
        </div>

        <div className="flex justify-between items-center mt-6 mb-8">
            <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 accent-primary-500 rounded border-gray-300" />
                <label htmlFor="remember" className="text-sm text-slate-500">Remember me</label>
            </div>
            <button className="text-sm text-slate-800 font-semibold">Forgot password?</button>
        </div>

        <button 
            onClick={() => navigate('/profile')}
            className="w-full bg-primary-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary-200 hover:bg-primary-600 transition-all active:scale-95"
        >
            Login
        </button>

        <div className="mt-8 mb-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-400">Or Log in with</span>
                </div>
            </div>
        </div>

        <div className="flex justify-center gap-6 mb-10">
            <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 hover:bg-gray-100 transition-colors">
               <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-6 h-6" alt="Google" />
            </button>
            <button className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 hover:bg-blue-100 transition-colors text-blue-600">
               <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.79-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 hover:bg-gray-800 transition-colors text-white">
               <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.24.7-.42 1.69-1.21 2.79-.8 1.19-1.67 2.38-1.32 3.29zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            </button>
        </div>

        <div className="text-center pb-6">
            <span className="text-slate-500 text-sm">Didn't have an account? </span>
            <button onClick={() => navigate('/signup')} className="text-slate-800 font-bold text-sm hover:underline">Create an account</button>
        </div>
      </div>
    </div>
  );
};