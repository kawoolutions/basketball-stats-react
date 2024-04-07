import {useEffect, useState} from "react";

import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useTranslation} from "react-i18next";
import Flag from "react-world-flags";
// import {Toast} from "primereact/toast";


export default function PersonManager() {
    const [persons, setPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState({});
    const { t, i18n } = useTranslation();

    const host = "3.79.245.148";
    const port = "8080";
    const url = "http://" + host + ":" + port + "/bbstats/ws/person/findall";

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPersons(data);
//                setPersons(data.reverse());
            })
            .catch(console.log)
    }, [url]);

    const salutationBody = (person: { gender: string }) => {
        const gender: string = person.gender;
        if (gender) {
            switch (gender) {
                case "MALE":
                    return t("common.mr.label");
                case "FEMALE":
                    return t("common.mr.label");
                default:
                    return t("common.error.label");
            }
        }
        return null;
    };

    const incognitoBody = (person: { incognito: boolean }) => {
        let text;
        switch (person.incognito) {
            case true:
                text = t("common.yes.label");
                break;
            case false:
                text = t("common.no.label");
                break;
            default:
                text = t("common.error.label");
                break;
        }
        return (
            <div style={{textAlign: "center"}}>
                {text}
            </div>
        );
    };

    const streetBody = (person: { streetName: string, houseNbr: string }) => {
        const streetName = person.streetName;
        const houseNumber = person.houseNbr;

        return houseNumber ? streetName + " " + houseNumber : streetName;
    }

    const countryBody = (person: { countryCode: string }) => {
        const countryCode = person.countryCode;

        return (
            <div style={{textAlign: "center"}}>
                <Flag code={countryCode} fallback={<span>Unknown</span>} height="16" style={{verticalAlign: -2}}/>
                {/*<img src="/assets/flags/flag_placeholder.png" alt={countryCode} width="30" className={`fi fi-${countryCode.toLowerCase()}`} />*/}
                <span> ({countryCode})</span>
            </div>
        );
    };

    const birthDateBody = (person: { birthDate: string }) => {
        const underscoredLocale = i18n.resolvedLanguage;
        const locale = underscoredLocale!.replace("_", "-");
        const dateNumber = Date.parse(person.birthDate);
        const date = new Date(dateNumber);
        const dateFormat = new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
//        console.log("Date = " + date + ", underscored locale = " + underscoredLocale + ", locale = " + locale + ", result = " + dateFormat);
        return person.birthDate ? dateFormat.format(date) : null;
    }

    const mobilePhoneNumber = (person: { id: number, phoneNumbers: [] }) => {
//        const phoneNumbers = person.phoneNumbers;

        return (
            <div style={{textAlign: "center"}}>
                {person.id}
            </div>
        );
    };

    // const toast;
    return (
        <div style={{marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10}}>
            <h2>{t("entity.person.plural.heading")}</h2>

            {/*<Toast ref={toast}/>*/}

            <DataTable value={persons}
                       header={"Person Manager (" + persons.length + ")"}
                       dataKey="id"
                       selection={selectedPerson}
                       selectionMode="single"
                       onSelectionChange={e => setSelectedPerson(e.value)}
                // onRowSelect={this.onRowSelect}
                // onRowUnselect={this.onRowUnselect}
                       sortField="lastName"
                       sortOrder={1}
                       resizableColumns
                       columnResizeMode="fit"
                       paginator
                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                       rows={25}
                       rowsPerPageOptions={[10, 25, 50]}
                       className="p-datatable-striped">
                <Column field="gender" header={t("common.salutation.heading")} body={salutationBody} sortable style={{width: "5.5%"}}/>
                <Column field="lastName" header={t("common.lastName.heading")} sortable style={{width: "9%"}}/>
                <Column field="firstName" header={t("common.firstName.heading")} sortable style={{width: "9%"}}/>
                <Column field="incognito" header={t("entity.person.incognito.heading")} body={incognitoBody} sortable style={{width: "6.5%"}}/>
                <Column field="roles" header={t("common.role.plural.heading")} style={{width: "5.5%"}}/>
                <Column field="streetName" header={t("common.street.heading")} body={streetBody} sortable style={{width: "8%"}}/>
                <Column field="zipCode" header={t("common.zipCode.heading")} sortable style={{width: "5.5%"}}/>
                <Column field="cityName" header={t("common.city.heading")} sortable style={{width: "7%"}}/>
                <Column field="countryCode" header={t("common.country.heading")} body={countryBody} sortable style={{width: "7.5%"}}/>
                <Column field="birthDate" header={t("common.birthDate.heading")} body={birthDateBody} sortable style={{width: "10%"}}/>
                <Column field="emailAddresses" header={t("common.emailAddress.heading")} sortable style={{width: "10.5%"}}/>
                <Column field="phoneNumbers" header={t("enum.phoneNumberType.MOBILE.heading")} body={mobilePhoneNumber} sortable style={{width: "9%"}}/>
                <Column field="actions" style={{width: "7%"}}/>
            </DataTable>
        </div>
    )
}