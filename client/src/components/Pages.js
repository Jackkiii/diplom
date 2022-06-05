import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {publication} = useContext(Context)
    const pageCount = Math.ceil(publication.totalCount / publication.limit + 1)
    const pages = []

    for(let i = 0; i < pageCount-1; i++) {
        pages.push(i + 1)
    }
    return (
        <Pagination className="mt-5">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={publication.page === page}
                    onClick={() => publication.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;