import { useNavigate } from 'react-router-dom';

import { CompanyView } from './CompanyView.js';

export function Home() {

    const navigate = useNavigate();

    return (
        <>

            <div>
                <a href='/companies' onClick={() => navigate('/companies', { replace: true })} rel='noopener noreferrer' > Companies </a>
                <a href='/invoices' onClick={() => navigate('/invoices', { replace: true })} rel='noopener noreferrer' > Invoices </a>
            </div >

            <CompanyView companyId='31124459' />
        </>
    )
}