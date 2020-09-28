import React, { Component } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/luna-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const modes =
{
    VIEW:   'VIEW',
    ADD:    'ADD',
    EDIT:   'EDIT',
    REMOVE: 'REMOVE'
}

class TestManager extends Component
{
    constructor()
    {
        super();

        let persons = [
            {
                "id": 3,
                "zipCode": "",
                "cityName": "",
                "streetName": "",
                "houseNbr": "",
                "firstName": "Ahmed",
                "lastName": "Al-Thiab",
                "gender": "MALE",
            },
            {
                "id": 4,
                "zipCode": "",
                "cityName": "",
                "streetName": "",
                "houseNbr": "",
                "firstName": "Stefan",
                "lastName": "Antalovics",
                "gender": "MALE",
            },
            {
                "id": 20,
                "zipCode": "",
                "cityName": "",
                "streetName": "",
                "houseNbr": "",
                "firstName": "Christian",
                "lastName": "Attina",
                "gender": "MALE",
            },
            {
                "id": 15,
                "zipCode": "",
                "cityName": "",
                "streetName": "",
                "houseNbr": "",
                "firstName": "Filmon",
                "lastName": "Berhane",
                "gender": "MALE",
            },
            {
                "id": 2,
                "zipCode": "64895",
                "cityName": "Darmstadt",
                "streetName": "",
                "houseNbr": "",
                "firstName": "Johannes",
                "lastName": "Loczewski",
                "gender": "MALE",
            },
            {
                "id": 1,
                "zipCode": "22880",
                "cityName": "Wedel",
                "streetName": "Rosengarten",
                "houseNbr": "6",
                "firstName": "Karsten",
                "lastName": "Wutzke",
                "gender": "MALE",
            }
        ]
        
        this.state = {entities: persons,
                      selectedEntity: null,
                      mode: null};
        
        this.onRowEdit = this.onRowEdit.bind(this);
        this.onRowRemove = this.onRowRemove.bind(this);
        
        this.actions = this.actions.bind(this);
    }
    
    render()
    {
        var header = "Person Manager (" + this.state.entities.length + ")"

        return (
            <div style={{ maxWidth: 1000, marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10 }}>
                
                <Toast ref={(el) => this.toast = el} />
                
                <DataTable value={this.state.entities}
                           header={header}
                           dataKey="id"
                           selection={this.state.selectedEntity}
                           selectionMode="single"
                           sortField='lastName'
                           sortOrder={1}
                           resizableColumns
                           columnResizeMode="fit"
                           className="p-datatable-striped">
                    <Column field="id" header='ID' sortable style={{width:'7.5%'}} />
                    <Column field="gender" header='Sal.' body={this.salutation} sortable style={{width:'10%'}} />
                    <Column field='lastName' header='Last Name' sortable style={{width:'15%'}} />
                    <Column field='firstName' header='First Name' sortable style={{width:'15%'}} />
                    <Column field='streetName' header='Street' body={this.street} sortable style={{width:'20%'}} />
                    <Column field='zipCode' header='ZIP' sortable style={{width:'10%'}} />
                    <Column field='cityName' header='City' sortable style={{width:'10%'}} />
                    <Column field="actions" body={this.actions} style={{width:'12.5%'}} />
                </DataTable>
            </div>
        );
    }

    actions(rowData)
    {
        return (
            <>
                <div style={{textAlign: "center"}}>
                    <Button icon="pi pi-pencil"
                            tooltip="Edit"
                            onClick={() => this.onRowEdit(rowData)}
                            className="p-button-sm p-button-raised p-button-rounded p-button-outlined" />
                    <Button icon="pi pi-trash"
                            tooltip="Remove"
                            className="p-button-sm p-button-raised p-button-rounded p-button-outlined"
                            onClick={() => this.onRowRemove(rowData)}
                            style={{marginLeft: 5}} />
                </div>
            </>
        );
    }

    onRowEdit(rowData)
    {
        // this.setState({selectedEntity: rowData});
        // this.setState({mode: modes.EDIT});
        // this.setState( (selectedEntity) =>  selectedEntity = rowData);
        // this.setState( (mode) =>  mode = modes.EDIT);
        // this.edit();

        this.setState({selectedEntity: rowData, mode: modes.EDIT}, () => this.toast.show({ severity: 'info', summary: 'Editing Person', detail: 'Name: ' + this.state.selectedEntity.lastName + ", " + this.state.mode, life: 3000 }))

        // console.log("Last name: " + this.state.selectedEntity.lastName);
        // console.log("Mode: " + this.state.mode);

        // this.toast.show({ severity: 'info', summary: 'Editing Person', detail: 'Name: ' + this.state.selectedEntity.lastName + ", " + this.state.mode, life: 3000 });
    }

    onRowRemove(rowData)
    {
        // this.setState({selectedEntity: rowData});
        // this.setState({mode: modes.REMOVE});
        // this.remove();

        // this.toast.show({ severity: 'info', summary: 'Removing Person', detail: 'Name: ' + rowData.lastName + ", " + this.state.mode, life: 3000 });

        this.setState({selectedEntity: rowData, mode: modes.REMOVE}, () => this.toast.show({ severity: 'info', summary: 'Removing Person', detail: 'Name: ' + this.state.selectedEntity.lastName + ", " + this.state.mode, life: 3000 }))
    }

    view()
    {
        this.setState({mode: modes.VIEW});
    }

    add()
    {
        this.setState({mode: modes.ADD});
    }

    edit()
    {
        this.setState({mode: modes.EDIT});
    }

    remove()
    {
        this.setState({mode: modes.REMOVE});
    }

    clear()
    {
        this.setState({mode: null});
    }
    
    salutation(rowData)
    {
        var gender = rowData['gender'];

        if ( gender )
        {
            switch( gender )
            {
                case "MALE":
                    return "Mr";
                
                case "FEMALE":
                    return "Mrs";
                
                default:
                    return "Error";
            }
        }

        return null;
    }

    street(rowData)
    {
        var streetName = rowData['streetName'];
        var houseNumber = rowData['houseNbr'];

        return houseNumber ? streetName + " " + houseNumber : streetName;
    }
}

export default TestManager;
