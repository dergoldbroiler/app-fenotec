'use client';

import { useState, useEffect, use } from "react";
import { Datastore }  from "../types/datastore";
import { Overview } from "../components/Overview";
import {WindowcloseEvent} from '../components/WindowcloseEvent';
import {Singledataset} from '../components/Singledataset';

import {toggleModal} from '../services/modalhandler';

const Monitor = () => {

    const [datastore, setDatastore] = useState<Datastore[]>();
    const [activeDatasetID, setActiveDatasetID] = useState<Number>();
    const [locked, setLocked] = useState<boolean>(false);


    /* first fetch */
    useEffect(() => {
        if(datastore) return;
        fetch('http://localhost:3001/api/orders').then(
                res => res.json()
            ).then(
                data => { 
                    setDatastore(data)
                }
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

        }, 1000);
        return () => clearInterval(interval);
    }, [datastore]);

        
    const clickHandlerOverview = (e:any, id: number, index:number) => {
        setActiveDatasetID(id);
        setLocked(!locked);
        console.log('clickHandlerOverview: ', id, index);
        toggleModal('modal_singledataset','show')
      
    }

    const handeRefusedClick = () => {
        alert('Dieser Eintrag wird aktuell von einem anderen Benutzer bearbeitet.');
    }

    if(!datastore) return (<div>loading...</div>)

    return (
        <div>
            {/* unlocks datasets on window close */}
            <WindowcloseEvent /> 
            <Singledataset datasetID={activeDatasetID} />        
        
            <Overview datastore={datastore} clickHandlerOverview={clickHandlerOverview} clickHandlerRefuse={handeRefusedClick}/>
            
        </div>
    )
}    


export default Monitor;