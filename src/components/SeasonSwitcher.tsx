import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Dropdown, DropdownProps } from "primereact/dropdown";
import { SeasonLabel } from "../utils/Utils.tsx";

interface Season {
    id: number
    pk: number
    startYear: number
}

export default function SeasonSwitcher() {
    const [seasons, setSeasons] = useState<Season[]>();
    const [selectedSeason, setSelectedSeason] = useState<Season>({
        "startYear": 2019,
        "id": 2019,
        "pk": 2019
    });
    
    const { t } = useTranslation();
    
    const host = "localhost";
    const port = "8081";
    const dataUrl = "http://" + host + ":" + port + "/rest/season/findall";
    const defaultUrl = "http://" + host + ":" + port + "/rest/season/finddefault";
    
    useEffect(() => {
        fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
                setSeasons(data);
            })
            .catch(console.log)
    }, [dataUrl]);

    useEffect(() => {
        fetch(defaultUrl)
            .then(response => response.json())
            .then(data => {
                setSelectedSeason(data);
            })
            .catch(console.log)
    }, [defaultUrl]);
    
    const selectableSeasonsTemplate = (season: Season) => {
        return SeasonLabel(t("entity.season.singular.label"), season.startYear);
    }
    
    const selectedSeasonTemplate = (season: Season, props: DropdownProps) => {
        console.log("selectedSeasonTemplate: " + season);
        if (season) {
            return SeasonLabel(t("entity.season.singular.label"), season.startYear);
        }
        return (
            <span>
                {props.placeholder}
            </span>
        );
    }
    
    console.log("Selected season: " + selectedSeason + ", JSON = " + JSON.stringify((selectedSeason)));
    if (!seasons) {
        return "Loading seasons...";
    } 
    if (!selectedSeason) {
        return "Loading selected season...";
    } 
    return (
        <Dropdown
            options={seasons}
            optionValue="id"
            optionLabel="startYear"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.value)}
            placeholder={t("common.unknown.label")}
            itemTemplate={selectableSeasonsTemplate}
            valueTemplate={selectedSeasonTemplate}/>
    );
}