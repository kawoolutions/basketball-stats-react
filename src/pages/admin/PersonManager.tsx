import { Fragment, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { Toast} from "primereact/toast";

import { CountryFlag } from "../../utils/Utils.tsx";

//import "../../assets/flags/flag-icons.css";

export default function PersonManager() {
    const [persons, setPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState({});
    const { t, i18n } = useTranslation();

    const host = "localhost";
    const port = "8081";
    const url = "http://" + host + ":" + port + "/rest/person/findall";

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

    const rolesBody = (person: { player: object, coach: object, referee: object }) => {
        const nodes: Array<ReactNode> = [];

        if (person.player) {
            nodes.push(<span title={t("entity.player.singular.label")} style={{width: "20px"}}>⛹️</span>);
        }
        if (person.coach) {
            nodes.push(<span title={t("entity.coach.singular.label")} style={{width: "20px"}}>👨‍💼</span>);
        }
        if (person.referee) {
            nodes.push(<img src="/src/assets/referee-border.png"
                title={t("entity.referee.singular.label")}
                width={15}
                height={15}
                alt={t("entity.referee.singular.label")}
                style={{verticalAlign: "-1px"}}/>);
        }

        return (
            <div style={{textAlign: "center"}}>
                {nodes}
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

        return CountryFlag(countryCode);
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

    const emailAddressesBody = (person: { emailAddresses: [] }) => {
        return (
            person.emailAddresses.map<ReactNode>( (e, index) => {
                return (
                    <Fragment key={e}>
                        {index > 0 && ", "}
                        <a href={`mailto:${e}`}>{e}</a>
                    </Fragment>
                );
            })
        );
    };

    type PhoneNumber = {
        contactId: number;
        type: string;
        countryCode: number;
        areaCode: number;
        subscriberNbr: number;
    }

    const phoneNumbersBody = (person: { phoneNumbers: Record<string, PhoneNumber> }) => {
        const phoneNumbers = person.phoneNumbers;
//        for (const [key, phoneNumber] of Object.entries(phoneNumbers)) {
//            console.log(key, "+" + phoneNumber!.countryCode + " " + phoneNumber!.areaCode + " " + phoneNumber!.subscriberNbr);
//        }
        const phoneNumberPattern = t("entity.phoneNumber.format");
        return Object.entries(phoneNumbers).map<ReactNode>((e) => phoneNumberPattern.replace("{0}", "" + e[1]!.countryCode).replace("{1}", "" + e[1]!.areaCode).replace("{2}", "" + e[1]!.subscriberNbr)).join(", ");
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
                <Column field="roles" header={t("common.role.plural.heading")} body={rolesBody} style={{width: "5.5%"}}/>
                <Column field="streetName" header={t("common.street.heading")} body={streetBody} sortable style={{width: "8%"}}/>
                <Column field="zipCode" header={t("common.zipCode.heading")} sortable style={{width: "5.5%"}}/>
                <Column field="cityName" header={t("common.city.heading")} sortable style={{width: "7%"}}/>
                <Column field="countryCode" header={t("common.country.heading")} body={countryBody} sortable style={{width: "7.5%"}}/>
                <Column field="birthDate" header={t("common.birthDate.heading")} body={birthDateBody} sortable style={{width: "10%"}}/>
                <Column field="emailAddresses" header={t("common.emailAddress.heading")} body={emailAddressesBody} sortable style={{width: "10.5%"}}/>
                <Column field="phoneNumbers" header={t("entity.phoneNumber.plural.heading")} body={phoneNumbersBody} sortable style={{width: "9%"}}/>
                <Column field="actions" style={{width: "7%"}}/>
            </DataTable>
        </div>
    )
}