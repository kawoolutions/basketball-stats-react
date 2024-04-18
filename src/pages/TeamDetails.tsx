import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Team {
    
}

export default function TeamDetails() {
    const [team, setTeam] = useState([]);
//    const { t, i18n } = useTranslation();
    const { t } = useTranslation();

    const host = "localhost";
    const port = "8081";
    const url = "http://" + host + ":" + port + "/rest/team/find/xxx";

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTeam(data);
                //setTeam(data.reverse());
            })
            .catch(console.log)
    }, [url]);

    const teamLabelBody = (team: Team) => {
        return team ? null : null;
    };

    const countryBody = (team: Team) => {
        return team ? null : null;
    };

    const ordinalNumberBody = (team: Team) => {
        return team ? null : null;
    };

    const teamTypeBody = (team: Team) => {
        return team ? null : null;
    };

    return (
        <div style={{marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10}}>
            <h2>{t("entity.team.plural.heading")}</h2>

            {/*<Toast ref={toast}/>*/}

            <DataTable value={team}
                header={"Teams (" + team.length + ")"}
                dataKey="id"
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
                <Column field="teamLabel" header={t("entity.team.singular.heading")} body={teamLabelBody} sortable style={{width: "30%"}}/>
                <Column field="teamOrdinalNumber" header={t("entity.team.ordinalNbr.heading")} body={ordinalNumberBody} sortable style={{width: "10%"}}/>
                <Column field="teamTypeCode" header={t("entity.teamType.singular.heading")} body={teamTypeBody} sortable style={{width: "10%"}}/>
                <Column field="continentName" header={t("entity.continent.singular.heading")} sortable style={{width: "10%"}}/>
                <Column field="countryCode" header={t("entity.country.singular.heading")} body={countryBody} sortable style={{width: "10%"}}/>
                <Column field="regionName" header={t("entity.region.singular.heading")} sortable style={{width: "10%"}}/>
                <Column field="stateName" header={t("entity.state.singular.heading")} sortable style={{width: "10%"}}/>
                <Column field="districtName" header={t("entity.district.singular.heading")} sortable style={{width: "10%"}}/>
            </DataTable>
        </div>
    );
}