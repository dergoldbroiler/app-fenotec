
export const toggleModal = (modalName, action, datasetId) => {
    const modal = document.getElementById(modalName);
    
   if(action === 'hide'){

    fetch('http://localhost:3001/api/orders/unlock').then(res => res.json()).then(data => {
        modal.classList.remove('d-block','show');
    });
    
   } else {
   
    fetch('http://localhost:3001/api/orders/order/?id='+datasetId).then(
        modal.classList.add('d-block','show')
    );
   }

    //.show d-block
}


