'use client';

import { useState, useEffect, use } from "react";
import { Datastore }  from "../types/datastore";
import { Overview } from "../components/Overview";

const Monitor = () => {

    const [datastore, setDatastore] = useState<Datastore[]>();

    /* first fetch */
    useEffect(() => {
        if(datastore) return;
        fetch('http://localhost:3001/api/orders').then(
                res => res.json()
            ).then(
                data => setDatastore(data)
            )
    }, []);


    /* refetch every 10 seconds */
    useEffect(() => {
        const interval = setInterval(() => {
         
            fetch('http://localhost:3001/api/orders').then(
                res => res.json()
            ).then(
                data => setDatastore(data)
            )

        }, 10000);
        return () => clearInterval(interval);
    }, [datastore]);

        
    const clickHandlerOverview = (e:any) => {
        console.log(e.target);
    }

    if(!datastore) return (<div>loading...</div>)

    return (
        <div>
        {
           <Overview datastore={datastore} clickHandlerOverview={clickHandlerOverview}/>
        }
        </div>
    )
}    


export default Monitor;