import React, { FunctionComponent, useState, useEffect } from 'react';
import styles from './Nav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AutocompleteField from './fields/AutocompleteField';

const Loading: FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
      const handleStart = () => {
        setLoading(true);
      }
      const handleComplete = () => {
        setLoading(false);
      }
      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
      return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
      }
  }, [router])
  
  return loading && (
    <div className="relative bg-gray-200">
      <div className={`${styles['loading-bar']} overflow-hidden h-2 text-xs flex mb-1 bg-yellow-200`}>
      </div>
    </div>
  );
}

const Nav: FunctionComponent = () => {
  const [openedProfileDropDown, setOpenedProfileDropDown] = useState<boolean>(false);
  const [openedMenuDropDown, setOpenedMenuDropDown] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button onClick={ () => setOpenedMenuDropDown(!openedMenuDropDown) } type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>

                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
              </div>
              <div className="hidden sm:block sm:ml-6 w-full">
                <div className="flex space-x-4 justify-between">
                  <Link href="/posts">
                    <a
                      className={router.asPath === '/posts' ?  'text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium bg-gray-200' : 'text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'}
                    >
                      Home
                    </a>
                  </Link>
                  <AutocompleteField type="users" />
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button className="bg-white p-1 rounded-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-300 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
      
              <div className="ml-3 relative">
                <div>
                  <button onClick={() => {setOpenedProfileDropDown(!openedProfileDropDown)}} className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-white" id="user-menu" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </button>
                </div>
                <div style={ !openedProfileDropDown ? {display: 'none'} : null } className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className={openedMenuDropDown ? 'sm:hidden mobile-menu-dropdown ' + styles.mobiledropdown : 'hidden mobile-menu-dropdown ' + styles.mobiledropdown} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/posts">
              <a className={router.asPath === '/posts' ?  'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium' : 'text-gray-600 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium'}>Home</a>
            </Link>
          </div>
        </div>
      </nav>
      <Loading />
    </>
  );
};

export default Nav;
