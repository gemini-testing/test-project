import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginForm from './LoginForm';

// Mock store for Storybook
const mockStore = configureStore({
  reducer: {
    auth: (state = { user: null, isLoading: false, error: null }, action) => {
      switch (action.type) {
        case 'auth/login/pending':
          return { ...state, isLoading: true, error: null };
        case 'auth/login/fulfilled':
          console.log('Login successful:', action.payload);
          return { ...state, isLoading: false, user: action.payload };
        case 'auth/login/rejected':
          console.log('Login failed:', action.payload);
          return { ...state, isLoading: false, error: action.payload };
        default:
          return state;
      }
    },
  },
});

// Decorator to wrap stories with Redux Provider and Router
const withProviders = (Story) => (
  <Provider store={mockStore}>
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Story />
          </div>
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

export default {
  title: 'Auth/LoginForm',
  component: LoginForm,
  decorators: [withProviders],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {};

// export const CompactVersion = {
//   decorators: [
//     (Story) => (
//       <Provider store={mockStore}>
//         <BrowserRouter>
//           <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-4 text-center">Login</h3>
//             <Story />
//           </div>
//         </BrowserRouter>
//       </Provider>
//     ),
//   ],
// };

// export const WithBackground = {
//   decorators: [
//     (Story) => (
//       <Provider store={mockStore}>
//         <BrowserRouter>
//           <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8">
//               <div>
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                   Sign in to your account
//                 </h2>
//                 <p className="mt-2 text-center text-sm text-gray-600">
//                   Or{' '}
//                   <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                     create a new account
//                   </a>
//                 </p>
//               </div>
//               <div className="bg-white p-8 rounded-lg shadow-md">
//                 <Story />
//               </div>
//             </div>
//           </div>
//         </BrowserRouter>
//       </Provider>
//     ),
//   ],
// };