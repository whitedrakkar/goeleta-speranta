
export function Companies({ companies }) {

    function handleEdit(company) {

        /* onAddNew(company); */
    }

    return (
        <>
            <div >Companies</div>
            <ul>
                {
                    companies.map((company, index) => {
                        return (
                            <li key={index}>
                                <div className='row'>
                                    <div>{company.name}: {company.cif}</div>
                                    <button onClick={handleEdit(company)}>Edit</button>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    )
}