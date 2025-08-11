import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Panel */}
      <div className="hidden bg-[#EBF4FF] p-10 lg:flex flex-col justify-center">
        <div>
          <div className="mb-12">
            <h1 className="text-2xl font-bold text-blue-600">Storage</h1>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                Manage your files<br />the best way
            </h2>
            <p className="text-gray-600 max-w-md">
                Awesome, we've created the perfect place for you to store all your documents.
            </p>
            <div className="relative w-full max-w-sm h-64 mt-8">
                 <Image 
                    src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="File Management Illustration"
                    fill
                    className="object-contain"
                 />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel (Form) */}
      <main className="flex items-center justify-center p-8 bg-white">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </main>
    </div>
  );
}