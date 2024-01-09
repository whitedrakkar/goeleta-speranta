

import { CompanyView } from './CompanyView.js';
import { Link } from "react-router-dom";

export function Home() {

    return (
        <>
            <CompanyView companyId='31124459' />
            <Link to="/companies">To companies</Link>
        </>
    )
}