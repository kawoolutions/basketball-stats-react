import React, { Component } from 'react';

// import { packageJson } from '../package.json';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import Flag from 'react-world-flags';

import 'primereact/resources/themes/luna-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './manager.css';

const packageJson = require('../package.json');

// console.log("PJ\n" + JSON.stringify(packageJson));

const APP_VERSION = packageJson.version;
const REACT_VERSION = React.version;
const REACT_DOM_VERSION = packageJson.dependencies["react-dom"].substring(1);
const PRIME_REACT_VERSION = packageJson.dependencies.primereact.substring(1);
const PRIME_ICONS_VERSION = packageJson.dependencies.primeicons.substring(1);
const WORLD_FLAGS_VERSION = packageJson.dependencies['react-world-flags'].substring(1);


const modes =
{
    VIEW:   'VIEW',
    ADD:    'ADD',
    EDIT:   'EDIT',
    REMOVE: 'REMOVE'
}

class PersonManager extends Component
{
    constructor()
    {
        super();

        this.state = {entities: [],
                      selectedEntity: null,
                      mode: null};
        
        // this.onRowSelect = this.onRowSelect.bind(this);
        // this.onRowUnselect = this.onRowUnselect.bind(this);
        this.onRowEdit = this.onRowEdit.bind(this);
        this.onRowRemove = this.onRowRemove.bind(this);
        
        // templates
        this.actionsTemplate = this.actionsTemplate.bind(this);
    }
    
    render()
    {
        var header = "Person Manager (" + this.state.entities.length + ")"
        return (
            <div style={{ maxWidth: 1800, marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10 }}>
                
                <Toast ref={(el) => this.toast = el} />
                
                <div>BBStats version: {APP_VERSION}</div>
                <div>React version: {REACT_VERSION}</div>
                <div>React DOM version: {REACT_DOM_VERSION}</div>
                <div>PrimeReact version: {PRIME_REACT_VERSION}</div>
                <div>PrimeIcons version: {PRIME_ICONS_VERSION}</div>
                <div>World Flags version: {WORLD_FLAGS_VERSION}</div>
                <br />

                <DataTable value={this.state.entities}
                           header={header}
                           dataKey="id"
                           selection={this.state.selectedEntity}
                           selectionMode="single"
                           onSelectionChange={e => this.setState({ selectedEntity: e.value })}
                        //    onRowSelect={this.onRowSelect}
                        //    onRowUnselect={this.onRowUnselect}
                           sortField='lastName'
                           sortOrder={1}
                           resizableColumns
                           columnResizeMode="fit"
                           paginator
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                           rows={10}
                           rowsPerPageOptions={[10,20,50]}
                           className="p-datatable-striped">
                    <Column field="gender" header='Sal.' body={this.salutation} sortable style={{width:'5%'}} />
                    <Column field='lastName' header='Last Name' sortable style={{width:'10%'}} />
                    <Column field='firstName' header='First Name' sortable style={{width:'10%'}} />
                    <Column field='incognito' header='Incognito' body={this.incognito} sortable style={{width:'5%'}} />
                    <Column field='roles' header='Roles' body={this.roles} style={{width:'5%'}} />
                    <Column field='streetName' header='Street' body={this.street} sortable style={{width:'10%'}} />
                    <Column field='zipCode' header='ZIP' sortable style={{width:'5%'}} />
                    <Column field='cityName' header='City' sortable style={{width:'7.5%'}} />
                    <Column field='countryCode' header='Country' body={this.country} sortable style={{width:'5%'}} />
                    <Column field='birthDate' header='Date of Birth' body={this.formattedBirthDate} sortable style={{width:'10%'}} />
                    <Column field='emailAddresses' header='E-Mail Address' body={this.firstEmailAddress} sortable style={{width:'10%'}} />
                    <Column field='phoneNumbers' header='Mobile Number' body={this.mobilePhoneNumber} sortable style={{width:'10%'}} />
                    <Column field="actions" body={this.actionsTemplate} style={{width:'7.5%'}} />
                </DataTable>
            </div>
        );
    }

    // Called *after* render()
    componentDidMount()
    {
        const url = 'http://kawoolutions.com/bbstats/ws/person/findall';
        
        fetch(url)
            .then(response => response.json())
            .then(data =>
            {
                this.setState({entities: data});
            })
            .catch(console.log)
    }

    actionsTemplate(rowData)
    {
        // var index = this.state.entities.indexOf( rowData );

        return (
            <>
                <div style={{textAlign: "center"}}>
                    {/* {index} */}
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
        this.setState({selectedEntity: rowData});
        this.setState({mode: modes.EDIT});

        // this.edit();

        console.log("Last name: " + rowData.lastName);
        console.log("Mode: " + this.state.mode);

        this.toast.show({ severity: 'info', summary: 'Editing Person', detail: 'Name: ' + rowData.lastName + ", " + this.state.mode, life: 3000 });
    }

    onRowRemove(rowData)
    {
        this.setState({selectedEntity: rowData});
        this.setState({mode: modes.REMOVE});
        // this.remove();

        this.toast.show({ severity: 'info', summary: 'Removing Person', detail: 'Name: ' + rowData.lastName + ", " + this.state.mode, life: 3000 });
    }

    onRowSelect(event)
    {
        this.toast.show({ severity: 'info', summary: 'Selecting Person', detail: 'Name: ' + event.data.lastName, life: 3000 });
    }

    onRowUnselect(event)
    {
        this.toast.show({ severity: 'warn', summary: 'Unselecting Person', detail: 'Name: ' + event.data.lastName, life: 3000 });
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

    incognito(rowData)
    {
        var incognito = rowData['incognito'];
        
        // console.log(typeof val);
        var text = null;
        
        if ( incognito === null )
        {
            return null;
        }

        switch( incognito )
        {
            case true:
                text = "Yes";
                break;
            
            case false:
                text = "No";
                break;
            
            default:
                text = "Error";
                break;
        }

        return (
            <>
                <div style={{textAlign: "center"}}>
                    <span>{text}</span>
                </div>
            </>
        );
    }

    roles(rowData)
    {
        var player = rowData['player'];
        var coach = rowData['coach'];
        var referee = rowData['referee'];
        
        return (
            <>
                <div style={{textAlign: "center"}}>
                    {player ? ( <span title="Player" role="img" aria-label="P">⛹️</span> ) : ( "" )}
                    {coach ? ( <span title="Coach" role="img" aria-label="P">👨‍💼</span> ) : ( "" )}
                    {
                        referee ? (
                            <img src="http://kawoolutions.com/bbstats/javax.faces.resource/images/icons/referee-border.png.xhtml?ln=bbstats" title="Referee" alt="" width="16" style={{verticalAlign: -2.5, marginLeft: 3}} />
                        ) : (
                            <></>
                        )
                    }
                </div>
            </>
        );
    }

    street(rowData)
    {
        var streetName = rowData['streetName'];
        var houseNumber = rowData['houseNbr'];

        return houseNumber ? streetName + " " + houseNumber : streetName;
    }

    country(rowData)
    {
        var countryCode = rowData['countryCode'];
        
        return (
            <>
                <div style={{textAlign: "center"}}>
                    <Flag code={ countryCode } fallback={ <span>Unknown</span> } height="16" style={{verticalAlign: -2}} />
                    {/* <img alt={countryCode} src="images/flag_placeholder.png" className={`flag flag-${countryCode.toLowerCase()}`} width="30" /> */}
                    <span> ({countryCode})</span>
                </div>
            </>
        );
    }

    formattedBirthDate(rowData)
    {
        var birthDateStamp = rowData['birthDate'];

        if ( birthDateStamp )
        {
            var birthDate = new Date( birthDateStamp );

            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            return birthDate.toLocaleDateString( 'en-US' ) + " (" + days[ birthDate.getDay() ] + ")";
        }

        return null;
    }
    
    firstEmailAddress(rowData)
    {
        var emailAddresses = rowData['emailAddresses'];

        if ( emailAddresses )
        {
            return emailAddresses[0];
        }

        return null;
    }
    
    mobilePhoneNumber(rowData)
    {
        // var phoneNumbers = rowData['phoneNumbers'];

        // if ( phoneNumbers )
        // {
        //     return " " + rowData['id'];
            
        //     // var mobilePhoneNumber = phoneNumbers["MOBILE"];

        //     // if ( mobilePhoneNumber )
        //     // {
        //     //     return "+" + mobilePhoneNumber.countryCode + " (" + mobilePhoneNumber.areaCode + ") " + mobilePhoneNumber.subscriberNbr;
        //     // }
        // }

        // return null;
        return rowData['id'];
    }
}

export default PersonManager;
