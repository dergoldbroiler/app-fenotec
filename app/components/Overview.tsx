import React, {useState, useEffect} from 'react'

import { Datastore } from '../types/datastore'

export const Overview = ({datastore, clickHandlerOverview}: Datastore[] | any) => {
    


    if(!datastore) return (<div>loading...</div>)

    return (
        <>
         <table className="table ">
            <thead className="table-dark">
                <tr>
                <th scope="col">Ausgang</th>
                <th scope="col">Versandart</th>
                <th scope="col">Einbau</th>
                <th scope="col">Kunde</th>

                </tr>
            </thead>
        <tbody>

        { datastore.map((element:Datastore, index: number) => {


            if( element.locked === true ) {
                return(
                    <tr key={element.id} className="red-border red" onClick={e => clickHandlerOverview(e,element.id, index)}>
                        <td>{element.Versand}</td>
                        <td>WHERE</td>
                        <td>{element.Einbaudatum}</td>
                        <td>{element.Kunde}</td>
                    </tr>
                )
            } else {
                return(
                    <tr key={element.id} onClick={e => clickHandlerOverview(e,element.id, index)}>
                        <td>{element.Versand}</td>
                        <td>WHERE</td>
                        <td>{element.Einbaudatum}</td>
                        <td>{element.Kunde}</td>
                    </tr>
                )
            }

            
        }
        )}
               
        </tbody>
</table></>
    )

}
