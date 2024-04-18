import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CountryFlag } from "../utils/Utils";

export default function Teams() {
    const [teamDtos, setTeamDtos] = useState([]);
//    const { t, i18n } = useTranslation();
    const { t } = useTranslation();

    const host = "localhost";
    const port = "8081";
    const url = "http://" + host + ":" + port + "/rest/teamdto/findall/2019";

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTeamDtos(data);
                //                setPersons(data.reverse());
            })
            .catch(console.log)
    }, [url]);

    const countryBody = (teamDto: { countryCode: string }) => {
        const countryCode = teamDto.countryCode;

        return CountryFlag(countryCode);
    };

    const ordinalNumber = (teamDto: { ordinalNbr: string }) => {
        return teamDto.ordinalNbr + ".";
    };

    return (
        <div style={{marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10}}>
            <h2>{t("entity.team.plural.heading")}</h2>

            {/*<Toast ref={toast}/>*/}

            <DataTable value={teamDtos}
                header={"Teams (" + teamDtos.length + ")"}
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
                <Column field="teamLabel" header={t("entity.team.singular.heading")} sortable style={{width: "30%"}}/>
                <Column field="teamOrdinalNumber" header={t("entity.team.ordinalNbr.heading")} body={ordinalNumber} sortable style={{width: "10%"}}/>
                <Column field="teamTypeCode" header={t("entity.teamType.singular.heading")} sortable style={{width: "10%"}}/>
                <Column field="continentName" header={t("entity.continent.singular.heading")} sortable style={{width: "10%"}}/>
                <Column field="countryCode" header={t("entity.country.singular.heading")} body={countryBody} sortable style={{width: "10%"}}/>
                <Column field="regionName" header={t("entity.region.singular.heading")} sortable style={{width: "10%"}}/>
                <Column field="stateName" header={t("entity.state.singular.heading")} sortable style={{width: "10%"}}/>
                <Column field="districtName" header={t("entity.district.singular.heading")} sortable style={{width: "10%"}}/>
            </DataTable>
        </div>
    );
}