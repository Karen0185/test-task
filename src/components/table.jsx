import React from "react";
import Pagination from "./pagination";
import '../assets/styles/table.css'

const Table = ({products, getItems}) => {


    return(
        <div className="table">
            <div className="t-head">
                <div className="t-row">
                    <div className="t-col">Имя</div>
                    <div className="t-col">Цена</div>
                    <div className="t-col">Бренд</div>
                    <div className="t-col">ID</div>
                </div>
            </div>
            <div className="t-body">
                {
                    products.map((item,idx) => (
                        <div key={idx} className="t-row">
                            <div className="t-col name-col">{item.product}</div>
                            <div className="t-col">{item.price}</div>
                            <div className="t-col">{item.brand}</div>
                            <div className="t-col id-col">{item.id}</div>
                        </div>
                    ))
                }
            </div>
            <Pagination getItems={getItems}/>
        </div>
    );
}

export default Table;