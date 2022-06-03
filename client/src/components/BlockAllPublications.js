import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import PublicationItem from "./PublicationItem";

const BlockAllPublications = observer( () => {
    const {publication} = useContext(Context)

    return (
        <div className="d-flex flex-column">
            {publication.publication.map(publicat =>
                <PublicationItem
                    key={publicat.id}
                    publication={publicat}
                />
            )}
        </div>
    );
});

export default BlockAllPublications;