import Head from 'next/head';
import { useUser } from './src/utils/openid';

export default function Home() {
  const {
    accessToken,
    profile: { email },
    logout
  } = useUser();

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
          integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <main className="bg-gray-50 min-h-screen text-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-4xl xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                OpenID example
              </h1>
              <div className="flex">
                <div className="w-1/4 flex-none">Logged in as:</div>
                <div className="truncate">{email}</div>
              </div>
              <div className="flex">
                <div className="w-1/4 flex-none">Access token:</div>
                <div className="truncate">{accessToken}</div>
              </div>
              <div>
                <button
                  type="button"
                  className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
