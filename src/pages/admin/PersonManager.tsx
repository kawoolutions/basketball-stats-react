import {useEffect, useState} from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {useTranslation} from "react-i18next";
// import { Toast } from "primereact/toast";

export default function PersonManager() {
    const [persons, setPersons] = useState([]);
    // const [selectedPerson, setSelectedPerson] = useState("");
    const { t } = useTranslation();

    const domainPort = "3.79.245.148:8080";
    // const domainPort = "localhost:8080";
    const allPersonsUrl = "http://" + domainPort + "/bbstats/ws/person/findall";

    useEffect(() => {
        fetch(allPersonsUrl)
            .then(response => response.json())
            .then(data => {
                setPersons(data);
            })
            .catch(console.log)
    }, []);

    // const toast;
    return (
        <div style={{maxWidth: 1600, marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10}}>
            <h2>{t("entity.person.plural.heading")}</h2>

            {/*<Toast ref={toast}/>*/}

            <DataTable value={persons}
                       header={"Person Manager (" + persons.length + ")"}
                       dataKey="id"
                // selection={selectedPerson}
                // selectionMode="single"
                // onSelectionChange={e => setSelectedPerson(e.value)}
                // onRowSelect={this.onRowSelect}
                // onRowUnselect={this.onRowUnselect}
                       sortField="lastName"
                       sortOrder={1}
                       resizableColumns
                       columnResizeMode="fit"
                       paginator
                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                       rows={10}
                       rowsPerPageOptions={[10, 20, 50]}
                       className="p-datatable-striped">
                <Column field="gender" header="Sal." sortable style={{width: "5.5%"}}/>
                <Column field="lastName" header="Last Name" sortable style={{width: "9%"}}/>
                <Column field="firstName" header="First Name" sortable style={{width: "9%"}}/>
                <Column field="incognito" header="Anon." sortable style={{width: "6.5%"}}/>
                <Column field="roles" header="Roles" style={{width: "5.5%"}}/>
                <Column field="streetName" header="Street" sortable style={{width: "8%"}}/>
                <Column field="zipCode" header="ZIP" sortable style={{width: "5.5%"}}/>
                <Column field="cityName" header="City" sortable style={{width: "7%"}}/>
                <Column field="countryCode" header="Country" sortable style={{width: "7.5%"}}/>
                <Column field="birthDate" header="Date of Birth" sortable
                        style={{width: "10%"}}/>
                <Column field="emailAddresses" header="E-Mail Addr." sortable
                        style={{width: "10.5%"}}/>
                <Column field="phoneNumbers" header="Mobile No." sortable
                        style={{width: "9%"}}/>
                <Column field="actions" style={{width: "7%"}}/>
            </DataTable>
        </div>
    )
}