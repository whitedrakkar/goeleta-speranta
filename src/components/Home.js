import { useNavigate } from 'react-router-dom';

import { Companies } from './Companies.js';

export function Home() {

    const navigate = useNavigate();

    return (
        <>

            <div>Home</div>
            <div>
                <a href='/companies' onClick={() => navigate('/companies', { replace: true })} rel="noopener noreferrer" > Companies </a>
                <a href='/invoices' onClick={() => navigate('/invoices', { replace: true })} rel="noopener noreferrer" > Invoices </a>
            </div >
        </>
    )
}