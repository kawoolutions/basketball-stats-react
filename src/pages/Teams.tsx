import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { NavLink, useParams } from "react-router-dom";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { CountryFlag } from "../utils/Utils";
import SeasonSwitcher from "../components/SeasonSwitcher.tsx";

interface TeamDto {

    rosterId: number
    clubName: string
    clubCode: string
    fullClubName: string

    teamOrdinalNumber: number
    teamName: string
    fullTeamName: string

    teamTypeCode: string

    teamTypeAgeGroup: string
    teamTypeGender: string

    teamDesc: string

    continentName: string
    countryCode: string
    countryName: string
    regionName: string
    stateName: string
    districtName: string
}

export default function Teams() {
    const [teamDtos, setTeamDtos] = useState([]);
//    const { t, i18n } = useTranslation();
    const { t } = useTranslation();

    const host = "localhost";
    const port = "8081";
    const url = "http://" + host + ":" + port + "/rest/teamdto/findall/2019";

    const { season } = useParams();

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTeamDtos(data);
                //setTeamDtos(data.reverse());
            })
            .catch(console.log)
    }, [url]);

    const teamLabelBody = (teamDto: TeamDto) => {
        return (
            <NavLink to={"/teams/details?roster=" + teamDto.rosterId} className="p-link nav-link">
                {teamDto.fullTeamName + ", " + teamTypeBody(teamDto)}
            </NavLink>
        );
    };

    const countryBody = (teamDto: TeamDto) => {
        return CountryFlag(teamDto.countryCode);
    };

    const ordinalNumberBody = (teamDto: TeamDto) => {
        return teamDto.teamOrdinalNumber + ".";
    };

    const teamTypeBody = (teamDto: TeamDto) => {
        return t("entity.teamType.code." + teamDto.teamTypeCode + ".label");
    };

    return (
        <div style={{marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10}}>

            <h2>{t("entity.team.plural.heading")} {season}</h2>

            <SeasonSwitcher />

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