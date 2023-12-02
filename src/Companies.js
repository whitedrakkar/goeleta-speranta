
export function Companies({ companies }) {

    return (
        <>
            <div >Companies</div>
            <ol>
                {
                    companies.map((company, index) => {
                        return (
                            <li key={index}>
                                <div >{company.name}: {company.cif}</div>
                            </li>
                        );
                    })
                }
            </ol>
        </>
    )
}