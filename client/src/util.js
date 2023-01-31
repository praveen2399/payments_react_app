
export async function getInvoiceItems(){
    let res = {};
    let result = {};
    console.log('in util.js');

    res =  await fetch("/api/getinvoiceitems");
    result = await res.json();
    console.log(result);
    // setData(result);
    return result;
}


export async function getCustomerIssues(phoneNumber){
    let res = {}
    let result = {} 

    res = await fetch(`/api/getCustomerIssues/?phoneNumber=${phoneNumber}`)
    result = await res.json()
    return result;
}

