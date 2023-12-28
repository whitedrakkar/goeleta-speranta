import { useNavigate } from 'react-router-dom';

export function CompaniesList({ companies }) {

    const navigate = useNavigate();

    function handleView(company) {
        let path = '/companies/' + company.id + '/view';
        navigate(path, { replace: true });
    }

    function handleEdit(company) {
        let path = '/companies/' + company.id + '/edit';
        navigate(path, { replace: true });
    }

    return (
        <>
            <div>Companies</div>
            <div className='container'>
                {
                    companies.map((company, index) => {
                        return (
                            <div className='row' key={index}>
                                <div className='col-4'>{company.name}</div>
                                <div className='col-sm'>{company.cif}</div>
                                <div className='col-sm'>{company.legalId}</div>
                                <div className='col-sm'>{company.euVatNumber}</div>
                                <div className='col-1'><button onClick={() => handleView(company)}>View</button></div>
                                <div className='col-1'><button onClick={() => handleEdit(company)}>Edit</button></div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}