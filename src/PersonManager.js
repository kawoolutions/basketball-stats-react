import React, { Component } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import Flag from 'react-world-flags';

import 'primereact/resources/themes/luna-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './manager.css';

class PersonManager extends Component
{
    constructor()
    {
        super();

        this.state = {entities: []};
    }

    componentDidMount()
    {
        const url = 'http://localhost:8080/bbstats/ws/person/findall';
        
        fetch(url)
            .then(response => response.json())
            .then(data =>
            {
                this.setState({entities: data});
                console.log('This is your data', data);
            })
            .catch(console.log)
    }
    
    render()
    {
        var header = "Person Manager (" + this.state.entities.length + ")"
        return (
            <div style={{ maxWidth: 1800, marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10 }}>
                <DataTable value={this.state.entities}
                           header={header}
                           dataKey="id"
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
                    <Column field="actions" body={this.actions} style={{width:'7.5%'}} />
                </DataTable>
            </div>
        );
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
                            <img src="http://localhost:8080/bbstats/javax.faces.resource/images/icons/referee-border.png.xhtml?ln=bbstats" title="Referee" alt="" width="16" style={{verticalAlign: -2.5, marginLeft: 3}} />
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

    actions(rowData)
    {
        // var index = this.state.entities.indexOf( rowData );

        return (
            <>
                <div style={{textAlign: "center"}}>
                    {/* {index} */}
                    <Button icon="pi pi-save"
                            tooltip="Edit"
                            className="p-button-sm p-button-raised p-button-rounded p-button-outlined" />
                    <Button icon="pi pi-trash"
                            tooltip="Edit"
                            className="p-button-sm p-button-raised p-button-rounded p-button-outlined"
                            style={{marginLeft: 5}} />
                </div>
            </>
        );
    }
}

export default PersonManager;
