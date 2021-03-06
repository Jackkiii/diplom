import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import PublicationItem from "./PublicationItem";

const BlockPublications = observer( () => {
    const {publication} = useContext(Context)

    return (
        <div className="d-flex flex-column">
            {publication.publications.map(publication =>
                <PublicationItem key={publication.id} publication={publication}/>
            )}
        </div>
    );
});

export default BlockPublications;