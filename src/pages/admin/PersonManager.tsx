import { useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

export default function PersonManager() {
    const [persons, setPersons] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);
    return (
        <div style={{maxWidth: 1600, marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10}}>

            <Toast ref={(el) => this.toast = el}/>

            <DataTable value={persons}
                       header={"Person Manager (" + persons.length + ")"}
                       dataKey="id"
                       selection={this.state.selectedEntity}
                       selectionMode="single"
                       onSelectionChange={e => this.setState({selectedEntity: e.value})}
                       onRowSelect={this.onRowSelect}
                       onRowUnselect={this.onRowUnselect}
                       sortField='lastName'
                       sortOrder={1}
                       resizableColumns
                       columnResizeMode="fit"
                       paginator
                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                       rows={10}
                       rowsPerPageOptions={[10, 20, 50]}
                       className="p-datatable-striped">
                <Column field="gender" header='Sal.' body={this.salutation} sortable style={{width: '5.5%'}}/>
                <Column field='lastName' header='Last Name' sortable style={{width: '9%'}}/>
                <Column field='firstName' header='First Name' sortable style={{width: '9%'}}/>
                <Column field='incognito' header='Anon.' body={this.incognito} sortable style={{width: '6.5%'}}/>
                <Column field='roles' header='Roles' body={this.roles} style={{width: '5.5%'}}/>
                <Column field='streetName' header='Street' body={this.street} sortable style={{width: '8%'}}/>
                <Column field='zipCode' header='ZIP' sortable style={{width: '5.5%'}}/>
                <Column field='cityName' header='City' sortable style={{width: '7%'}}/>
                <Column field='countryCode' header='Country' body={this.country} sortable style={{width: '7.5%'}}/>
                <Column field='birthDate' header='Date of Birth' body={this.formattedBirthDate} sortable
                    style={{width: '10%'}}/>
                <Column field='emailAddresses' header='E-Mail Addr.' body={this.firstEmailAddress} sortable
                    style={{width: '10.5%'}}/>
                <Column field='phoneNumbers' header='Mobile No.' body={this.mobilePhoneNumber} sortable
                    style={{width: '9%'}}/>
                <Column field="actions" body={this.actionsTemplate} style={{width: '7%'}}/>
            </DataTable>

            {this.renderSubPanel()}
        </div>
    )
}