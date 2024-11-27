import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Custom hook for route protection
const useAuth = (roleRequired) => {
    const router = useRouter();

    useEffect(() => {
        // Check if there's a user in localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        // If no user is logged in or the role doesn't match, redirect to login
        if (!user || (roleRequired && user.role !== roleRequired)) {
            router.push('/login'); // Redirect to login page
        }
    }, [router, roleRequired]);
};

export default useAuth;
