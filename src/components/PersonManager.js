import React, {Component} from 'react';

// import { packageJson } from '../package.json';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Panel} from 'primereact/panel';
import {InputText} from 'primereact/inputtext';
import {Checkbox} from 'primereact/checkbox';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';

import Flag from 'react-world-flags';

import 'primereact/resources/themes/luna-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';

import '../manager.css';

const packageJson = require('../../package.json');

// console.log("PJ\n" + JSON.stringify(packageJson));

const APP_VERSION = packageJson.version;
const REACT_VERSION = React.version;
// const REACT_DOM_VERSION = packageJson.dependencies["react-dom"].substring(1);
const PRIME_REACT_VERSION = packageJson.dependencies.primereact.substring(1);


const modes = {
    VIEW: 'VIEW',
    ADD: 'ADD',
    EDIT: 'EDIT',
    REMOVE: 'REMOVE'
}

class PersonManager extends Component {
    constructor() {
        super();

        this.state = {
            entities: [],
            selectedEntity: null,
            mode: null
        };

        // row events
        this.onRowEdit = this.onRowEdit.bind(this);
        this.onRowRemove = this.onRowRemove.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onRowUnselect = this.onRowUnselect.bind(this);

        // sub panel events
        this.onCountryChange = this.onCountryChange.bind(this);

        // templates
        this.actionsTemplate = this.actionsTemplate.bind(this);
    }

    render() {
        var header = "Person Manager (" + this.state.entities.length + ")"

        return (
            <div style={{maxWidth: 1600, marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10}}>

                <Toast ref={(el) => this.toast = el}/>

                <div>Application version: {APP_VERSION}</div>
                <div>React version: {REACT_VERSION}</div>
                {/* <div>React DOM version: {REACT_DOM_VERSION}</div> */}
                <div>PrimeReact version: {PRIME_REACT_VERSION}</div>
                {/* <div>PrimeIcons version: {PRIME_ICONS_VERSION}</div> */}
                {/* <div>World Flags version: {WORLD_FLAGS_VERSION}</div> */}
                <br/>

                <DataTable value={this.state.entities}
                           header={header}
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
        );
    }

    renderSubPanel() {
        let subPanel = null;

        if (this.state.selectedEntity) {
            subPanel = <Panel style={{marginTop: 10}}>
                <div className="p-grid">
                    <div className="p-col-1">
                        <label htmlFor="salutation" style={{verticalAlign: -6}}>Salutation</label>
                    </div>
                    <div className="p-col-4">
                        <Dropdown value={this.state.selectedEntity.gender}
                                  required
                                  options={this.genders}
                                  optionLabel="name"
                                  optionValue="gender"
                                  onChange={(e) => {
                                      this.setState(state => (state.selectedEntity.gender = e.value))
                                  }}
                                  disabled={this.state.mode !== "EDIT"}
                                  placeholder="Please select..."/>
                    </div>
                    <div className="p-col-1"/>
                    <div className="p-col-1">
                        <label htmlFor="incognito" style={{verticalAlign: -6}}>Incognito</label>
                    </div>
                    <div className="p-col-4">
                        <Checkbox inputId="incognito"
                                  value="Incognito"
                                  checked={this.state.selectedEntity.incognito}
                                  onChange={(e) => {
                                      this.setState(state => (state.selectedEntity.incognito = e.checked))
                                  }}
                                  disabled={this.state.mode !== "EDIT"}
                                  style={{verticalAlign: -2}}/>
                    </div>
                    <div className="p-col-1"/>

                    <div className="p-col-1">
                        <label htmlFor="first-name" style={{verticalAlign: -6}}>First name</label>
                    </div>
                    <div className="p-col-4">
                        <InputText id="first-name"
                                   value={this.state.selectedEntity.firstName}
                                   required
                                   onChange={(e) => {
                                       e.persist();
                                       this.setState(state => (state.selectedEntity.firstName = e.target.value))
                                   }}
                                   disabled={this.state.mode !== "EDIT"}
                                   maxLength="50"
                                   style={{width: "100%"}}/>
                    </div>
                    <div className="p-col-1"/>
                    <div className="p-col-1">
                        <label htmlFor="last-name" style={{verticalAlign: -6}}>Last name</label>
                    </div>
                    <div className="p-col-4">
                        <InputText id="last-name"
                                   value={this.state.selectedEntity.lastName}
                                   required
                                   onChange={(e) => {
                                       e.persist();
                                       this.setState(state => (state.selectedEntity.lastName = e.target.value))
                                   }}
                                   disabled={this.state.mode !== "EDIT"}
                                   maxLength="50"
                                   style={{width: "100%"}}/>
                    </div>
                    <div className="p-col-1"/>

                    <div className="p-col-1">
                        <label htmlFor="street" style={{verticalAlign: -6}}>Street</label>
                    </div>
                    <div className="p-col-4">
                        <InputText id="street"
                                   value={this.state.selectedEntity.streetName || ''}
                                   onChange={(e) => {
                                       e.persist();
                                       this.setState(state => (state.selectedEntity.streetName = e.target.value))
                                   }}
                                   disabled={this.state.mode !== "EDIT"}
                                   maxLength="100"
                                   style={{width: "80%"}}/>
                        <InputText id="house-nbr"
                                   value={this.state.selectedEntity.houseNbr || ''}
                                   onChange={(e) => {
                                       e.persist();
                                       this.setState(state => (state.selectedEntity.houseNbr = e.target.value))
                                   }}
                                   disabled={this.state.mode !== "EDIT"}
                                   maxLength="10"
                                   style={{width: "20%"}}/>
                    </div>
                    <div className="p-col-1"/>
                    <div className="p-col-1">
                        <label htmlFor="zip-code" style={{verticalAlign: -6}}>ZIP code</label>
                    </div>
                    <div className="p-col-4">
                        <InputText id="zip-code"
                                   value={this.state.selectedEntity.zipCode || ''}
                                   onChange={(e) => {
                                       e.persist();
                                       this.setState(state => (state.selectedEntity.zipCode = e.target.value))
                                   }}
                                   disabled={this.state.mode !== "EDIT"}
                                   style={{width: "100%"}}/>
                    </div>
                    <div className="p-col-1"/>

                    <div className="p-col-1">
                        <label htmlFor="city" style={{verticalAlign: -6}}>City</label>
                    </div>
                    <div className="p-col-4">
                        <InputText id="city"
                                   value={this.state.selectedEntity.cityName || ''}
                                   onChange={(e) => {
                                       e.persist();
                                       this.setState(state => (state.selectedEntity.cityName = e.target.value))
                                   }}
                                   disabled={this.state.mode !== "EDIT"}
                                   style={{width: "100%"}}/>
                    </div>
                    <div className="p-col-1"/>
                    <div className="p-col-1">
                        <label htmlFor="country" style={{verticalAlign: -6}}>Country</label>
                    </div>
                    <div className="p-col-4">
                        <Dropdown id="country"
                                  value={this.countries.find(c => c.isoCode === this.state.selectedEntity.countryCode) || ''}
                                  valueTemplate={this.selectedCountryDropdownTemplate}
                                  itemTemplate={this.selectableCountryDropdownTemplate}
                                  options={this.countries}
                                  optionLabel="name"
                                  onChange={(e) => {
                                      this.setState(state => (state.selectedEntity.countryCode = e.value.countryCode))
                                  }}
                                  disabled={this.state.mode !== "EDIT"}
                                  placeholder="Please select..."/>
                    </div>
                    <div className="p-col-1"/>

                    <div className="p-col-1">
                        <label htmlFor="birth-date" style={{verticalAlign: -6}}>Date of Birth</label>
                    </div>
                    <div className="p-col-4">
                        <Calendar id="birth-date"
                                  value={this.state.selectedEntity.birthDate || ''}
                                  readOnlyInput
                                  disabled={this.state.mode !== "EDIT"}
                                  onChange={(e) => this.setState(state => (state.selectedEntity.birthDate = e.value))}/>
                    </div>
                    <div className="p-col-1"/>
                    <div className="p-col-1">
                        <label htmlFor="e-mail-address" style={{verticalAlign: -6}}>E-Mail Address</label>
                    </div>
                    <div className="p-col-4">
                        <InputText id="e-mail-address"
                                   value={this.state.selectedEntity.emailAddresses[0] || ''}
                                   onChange={(e) => {
                                       e.persist();
                                       this.setState(state => (state.selectedEntity.emailAddresses[0] = e.target.value))
                                   }}
                                   disabled={this.state.mode !== "EDIT"}
                                   style={{width: "100%"}}/>
                    </div>
                    <div className="p-col-1"/>
                </div>
            </Panel>;
        }

        return subPanel;
    }

    // Called *after* render()
    componentDidMount() {
        const domainPort = "3.79.245.148:8080";
        // const domainPort = "localhost:8080";
        const allPersonsUrl = "http://" + domainPort + "/bbstats/ws/person/findall";

        fetch(allPersonsUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({entities: data});
            })
            .catch(console.log)

        // all genders
        this.genders = [{"gender": "MALE", "name": "Mr"}, {"gender": "FEMALE", "name": "Mrs"}];

        // all countries
        const allCountriesUrl = "http://" + domainPort + "/bbstats/ws/country/findall";

        fetch(allCountriesUrl)
            .then(response => response.json())
            .then(data => {
                this.countries = data;
            })
            .catch(console.log)

        // default countries
        const defaultCountryUrl = "http://" + domainPort + "/bbstats/ws/country/finddefault";

        fetch(defaultCountryUrl)
            .then(response => response.json())
            .then(data => {
                this.defaultCountry = data[0];
            })
            .catch(console.log)
    }

    actionsTemplate(rowData) {
        // var index = this.state.entities.indexOf( rowData );

        return (
            <>
                <div style={{textAlign: "center"}}>
                    {/* {index} */}
                    <Button icon="pi pi-pencil"
                            tooltip="Edit"
                            onClick={() => this.onRowEdit(rowData)}
                            className="p-button-sm p-button-raised p-button-rounded p-button-outlined"/>
                    <Button icon="pi pi-trash"
                            tooltip="Remove"
                            className="p-button-sm p-button-raised p-button-rounded p-button-outlined"
                            onClick={() => this.onRowRemove(rowData)}
                            style={{marginLeft: 5}}/>
                </div>
            </>
        );
    }

    onRowEdit(rowData) {
        this.setState({selectedEntity: rowData, mode: modes.EDIT}, () => this.toast.show({
            severity: 'info',
            summary: 'Editing Person',
            detail: 'Name: ' + this.state.selectedEntity.lastName + ", " + this.state.mode,
            life: 3000
        }))
    }

    onRowRemove(rowData) {
        this.setState({selectedEntity: rowData, mode: modes.REMOVE}, () => this.toast.show({
            severity: 'info',
            summary: 'Removing Person',
            detail: 'Name: ' + this.state.selectedEntity.lastName + ", " + this.state.mode,
            life: 3000
        }))
    }

    onRowSelect(event) {
        this.setState({selectedEntity: event.data, mode: modes.VIEW}, () => this.toast.show({
            severity: 'info',
            summary: 'Viewing Person',
            detail: 'Name: ' + this.state.selectedEntity.lastName + ", " + event.data.countryCode + ", C: " + this.countries.find(c => c.isoCode === event.data.countryCode) + ", " + this.state.mode,
            life: 3000
        }))
    }

    onRowUnselect(event) {
        let previousMode = this.state.mode;

        this.setState({selectedEntity: null, mode: null}, () => this.toast.show({
            severity: 'info',
            summary: 'Unselecting Person',
            detail: 'Name: ' + event.data.lastName + ", PREV: " + previousMode,
            life: 3000
        }))
    }

    view() {
        this.setState({mode: modes.VIEW});
    }

    add() {
        this.setState({mode: modes.ADD});
    }

    edit() {
        this.setState({mode: modes.EDIT});
    }

    remove() {
        this.setState({mode: modes.REMOVE});
    }

    clear() {
        this.setState({mode: null});
    }

    salutation(rowData) {
        var gender = rowData['gender'];

        if (gender) {
            switch (gender) {
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

    incognito(rowData) {
        var incognito = rowData['incognito'];

        // console.log(typeof val);
        var text = null;

        if (incognito === null) {
            return null;
        }

        switch (incognito) {
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

    roles(rowData) {
        var player = rowData['player'];
        var coach = rowData['coach'];
        var referee = rowData['referee'];

        return (
            <>
                <div style={{textAlign: "center"}}>
                    {player ? (<span title="Player" role="img" aria-label="P">⛹️</span>) : ("")}
                    {coach ? (<span title="Coach" role="img" aria-label="P">👨‍💼</span>) : ("")}
                    {
                        referee ? (
                            <img
                                src="http://3.79.245.148:8080/bbstats/javax.faces.resource/images/icons/referee-border.png.xhtml?ln=bbstats"
                                title="Referee" alt="" width="16" style={{verticalAlign: -2.5, marginLeft: 3}}/>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </>
        );
    }

    street(rowData) {
        var streetName = rowData['streetName'];
        var houseNumber = rowData['houseNbr'];

        return houseNumber ? streetName + " " + houseNumber : streetName;
    }

    country(rowData) {
        var countryCode = rowData['countryCode'];

        return (
            <>
                <div style={{textAlign: "center"}}>
                    <Flag code={countryCode} fallback={<span>Unknown</span>} height="16" style={{verticalAlign: -2}}/>
                    {/* <img alt={countryCode} src="images/flag_placeholder.png" className={`flag flag-${countryCode.toLowerCase()}`} width="30" /> */}
                    <span> ({countryCode})</span>
                </div>
            </>
        );
    }

    formattedBirthDate(rowData) {
        var birthDateStamp = rowData['birthDate'];

        if (birthDateStamp) {
            var birthDate = new Date(birthDateStamp);

            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            return birthDate.toLocaleDateString('en-US') + " (" + days[birthDate.getDay()] + ")";
        }

        return null;
    }

    firstEmailAddress(rowData) {
        var emailAddresses = rowData['emailAddresses'];

        if (emailAddresses) {
            return emailAddresses[0];
        }

        return null;
    }

    mobilePhoneNumber(rowData) {
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

    selectedCountryDropdownTemplate(option, props) {
        if (option) {
            return (
                <div>
                    <Flag code={option.isoCode} fallback={<span>Unknown</span>} height="16"
                          style={{verticalAlign: -2}}/>
                    {/* <img alt={countryCode} src="images/flag_placeholder.png" className={`flag flag-${countryCode.toLowerCase()}`} width="30" /> */}
                    <span> {option.name} ({option.isoCode})</span>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    selectableCountryDropdownTemplate(option) {
        return (
            <div>
                <Flag code={option.isoCode} fallback={<span>Unknown</span>} height="16" style={{verticalAlign: -2}}/>
                {/* <img alt={countryCode} src="images/flag_placeholder.png" className={`flag flag-${countryCode.toLowerCase()}`} width="30" /> */}
                <span> {option.name} ({option.isoCode})</span>
            </div>
        );
    }

    onCountryChange(event) {
        this.setState({selectedCountry: event.value});
    }
}

export default PersonManager;
