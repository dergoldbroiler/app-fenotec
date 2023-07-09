'use client';
import React, {useState, useEffect, use} from 'react'
import {toggleModal} from '../services/modalhandler';



import { Datastore } from '../types/datastore'

export const Singledataset = ({datasetID}:Number | any) => {

   

   const [activeDataset, setActiveDataset] = useState<Datastore>();
   const [mappedDataset, setMappedDataset] = useState<any>();

   useEffect(() => {
    if(!datasetID) return;
    
    let fetchURL = 'http://localhost:3001/api/orders/order?id='+datasetID;

    if(location.host.search('localhost') < 0) {
        fetchURL = 'https://app.fenotec.dergoldbroiler.de/api/orders/order?id='+datasetID;
    }
    
    if(!fetchURL) return;
    
    fetch(fetchURL).then(
        res => res.json()
    ).then(
        data => {
            setActiveDataset(data);
            setMappedDataset(Object.keys(data));
        }
    )
   }, [datasetID]);

    return (
        <div className="modal fade" id="modal_singledataset" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header pe-5">
                    <h1 className="modal-title fs-5" id="exampleModalToggleLabel">{datasetID}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => toggleModal('modal_singledataset','hide',datasetID)}></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-dark table-striped">
                            <tbody>
                        
                        {
                          
                          mappedDataset &&
                          mappedDataset.map((key: any, index: number) => {
                                return(
                                    <tr key={index}>
                                        <td>{key}</td>
                                        <td>{mappedDataset[key]}</td>
                                    </tr>
                                )
                            })
                        }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                   
                    </div>
                </div>
            </div>
        </div>

        
    )

}
