import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Dropdown, DropdownProps } from "primereact/dropdown";

interface Season {
    id: number
    pk: number
    startYear: number
}

export default function SeasonSwitcher() {
    const [seasons, setSeasons] = useState<Season[]>([
        {
            "startYear": 2001,
            "id": 2001,
            "pk": 2001
        },
        {
            "startYear": 2002,
            "id": 2002,
            "pk": 2002
        },
        {
            "startYear": 2003,
            "id": 2003,
            "pk": 2003
        },
        {
            "startYear": 2019,
            "id": 2019,
            "pk": 2019
        }
    ]);
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
    
//    useEffect(() => {
//        fetch(dataUrl)
//            .then(response => response.json())
//            .then(data => {
//                setSeasons(data);
////                setSelectedSeason(() => data[data.length - 1]);
//            })
//            .catch(console.log)
//    }, [dataUrl]);
//    
//    useEffect(() => {
//        fetch(defaultUrl)
//            .then(response => response.json())
//            .then(data => {
//                setSelectedSeason(data);
//                console.log("Dropdown selected season THEN: " + data.startYear);
//            })
//            .catch(console.log)
//    }, [defaultUrl]);
    
    const selectableSeasonsTemplate = (season: Season) => {
        return (
            <div>
                <span>{t("entity.season.singular.label")} {season.startYear}/{(season.startYear + 1).toString().substring(2)}</span>
            </div>
        );
    }
    
    const selectedSeasonTemplate = (season: Season, props: DropdownProps) => {
        console.log("selectedSeasonTemplate: " + season);
        if (season) {
            return (
                <>
                {season.startYear}
                </>
            );
        }
        return (
            <span>
                {props.placeholder}
            </span>
        );
    }
    
    console.log("Dropdown selected season: " + selectedSeason + ", JSON = " + JSON.stringify((selectedSeason)));
    if (!seasons) {
        return "Loading seasons...";
    } 
    if (!selectedSeason) {
        return "Loading selected season...";
    } 
    return (
        <Dropdown
            options={seasons}
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.value)}
            placeholder={t("common.unknown.label")}
            itemTemplate={selectableSeasonsTemplate}
            valueTemplate={selectedSeasonTemplate}/>
    );
}