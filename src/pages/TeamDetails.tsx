import { useTranslation } from "react-i18next";

export default function TeamDetails() {
//    const [team, setTeam] = useState([]);
//    const { t, i18n } = useTranslation();
    const { t } = useTranslation();

//    const host = "localhost";
//    const port = "8081";
//    const url = "http://" + host + ":" + port + "/rest/team/find/xxx";

//    useEffect(() => {
//        fetch(url)
//            .then(response => response.json())
//            .then(data => {
//                setTeam(data);
//                //setTeam(data.reverse());
//            })
//            .catch(console.log)
//    }, [url]);

    return (
        <div style={{marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10}}>
            <h2>{t("entity.roster.singular.heading")}</h2>

            {/*<Toast ref={toast}/>*/}

        </div>
    );
}