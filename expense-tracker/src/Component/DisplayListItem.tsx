import React from 'react';
import {useEffect, useState} from 'react';
import IDataList from '../model/IDataList';
import {getDataFromServer} from '../service/menu';
import ExpenseTracker from './ExpenseTracker';

function DisplayListItem(){
    const [items, setItems] = useState<IDataList[]>([]);
    const [error, seterror] = useState<Error|null>(null);
    const [sum, setSum] = useState<number|null>(0);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    var rahulSpent1 = 0;
    var rameshSpent1 = 0;

    useEffect(() =>{
        const fetchData = async() => {
            try{
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result,v) => (result + v.price),0));
                priceShare(data);


            }catch(error:any){
                seterror(error);
            }
        }
        fetchData();
    },[showForm])
        
    const priceShare = (data:IDataList[]) =>{
        data.map((x) => x.payeeName == "Rahul"? (rahulSpent1 = rahulSpent1 + x.price) : (rameshSpent1 = rameshSpent1 + x.price)
        );
        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1);

    }

    return(
        <>
        
        <header id='page-header'> Expense Tracker</header>
        <button id='Add-Button' onClick = {()=>setShowForm(true)}> Add</button>
        {
            showForm && (
                <div>
                    <ExpenseTracker onTrue={()=>setShowForm(false)} onClose={()=>setShowForm(false)}></ExpenseTracker>
                </div>
            )
        }
        <>
        <div className='use-inline date header-color'>Date</div>
        <div className='use-inline header-color'>Product Purchase</div>
        <div className='use-inline price header-color'>Price</div>
        <div className='use-inline header-color' style={{width:200}}>Payee Name</div>

        </>
        
        {
            items && items.map((user, idx) => (
                <div key={user.id}>
                    <div className='use-inline date'>{user.setDate}</div>
                    <div className='use-inline'>{user.product}</div>
                    <div className='use-inline price'>{user.price}</div>
                    <div className='use-inline'>{user.payeeName}</div>
                </div>
                
            ))
        }
        <hr/>

        <div className='use-inline'> Total: </div>
        <span className='use-inline total'> {sum}</span><br/>

        <div className='use-inline'> Rahul Spent </div>
        <span className='use-inline total Rahul'> {rahulSpent}</span><br/>

        <div className='use-inline'> Ramesh Spent </div>
        <span className='use-inline total Ramesh'> {rameshSpent}</span><br/>

        <div className='use-inline payable'>
        {rahulSpent > rameshSpent ? "Pay Rahul" : "Pay Ramesh"}
        </div>
        <span className='use-inline payable price'> 
        {Math.abs((rahulSpent - rameshSpent)/2)}
        </span><br/>

        {error && <>{error?.message}</>}
        </>
    )
}

export default DisplayListItem;