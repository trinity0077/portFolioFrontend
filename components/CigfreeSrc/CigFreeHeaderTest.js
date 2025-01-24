import { useEffect, useState } from 'react';
import { UserIcon, XIcon } from 'lucide-react';

function CigfreeHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [errorMessageSignIn, setErrorMessageSignIn] = useState('');
  const [errorMessageSignUp, setErrorMessageSignUp] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    }
  }, []);

  const handleSignUp = () => {
    if (signUpUsername && signUpPassword) {
      setIsAuthenticated(true);
      setUsername(signUpUsername);
      setIsModalOpen(false);
      setSignUpUsername('');
      setSignUpPassword('');
    } else {
      setErrorMessageSignUp('Please fill in all fields');
      setTimeout(() => setErrorMessageSignUp(''), 2000);
    }
  };

  const handleSignIn = () => {
    if (signInUsername && signInPassword) {
      setIsAuthenticated(true);
      setUsername(signInUsername);
      setIsModalOpen(false);
      setSignInUsername('');
      setSignInPassword('');
    } else {
      setErrorMessageSignIn('Invalid credentials');
      setTimeout(() => setErrorMessageSignIn(''), 2000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`bg-white shadow-md transition-all duration-300 ${isModalOpen ? '' : 'rounded-b-2xl'} border-b-4 border-blue-500`}>
        {/* Header */}
        <header className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-amber-400 drop-shadow-sm">
              CigFree
            </h1>
            
            {isAuthenticated ? (
              <div className="flex flex-col items-end">
                <p className="text-sm text-gray-600 mb-1">Salutation</p>
                <span className="text-lg text-amber-500 font-medium">
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={toggleModal}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {isModalOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <UserIcon className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
          
          {/* Navigation */}
          <div className="mt-4 flex justify-center space-x-8">
            <button className="text-gray-600 hover:text-blue-500 transition-colors">
              cig
            </button>
            <button className="text-gray-600 hover:text-blue-500 transition-colors">
              vape
            </button>
          </div>
        </header>

        {/* Modal */}
        {isModalOpen && !isAuthenticated && (
          <div className="border-t border-gray-100 bg-white rounded-b-2xl">
            <div className="max-w-md mx-auto p-6">
              {/* Tabs */}
              <div className="flex justify-center mb-6">
                <button
                  className={`px-4 py-2 ${
                    activeTab === 'signin'
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('signin')}
                >
                  Sign In
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === 'signup'
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </button>
              </div>

              {/* Sign In Form */}
              {activeTab === 'signin' && (
                <div className="space-y-4">
                  {errorMessageSignIn && (
                    <div className="text-red-500 text-center text-sm">
                      {errorMessageSignIn}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Username"
                    value={signInUsername}
                    onChange={(e) => setSignInUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSignIn}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* Sign Up Form */}
              {activeTab === 'signup' && (
                <div className="space-y-4">
                  {errorMessageSignUp && (
                    <div className="text-red-500 text-center text-sm">
                      {errorMessageSignUp}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Username"
                    value={signUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSignUp}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CigfreeHeader;