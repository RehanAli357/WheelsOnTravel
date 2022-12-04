import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Style/Display/Display.css";

const DisplayData = () => {
    const [id, setid] = useState();
    const [name, setname] = useState();
    const [busno, setbusno] = useState();
    const [revenue, setrevenu] = useState();
    const [shift, setshift] = useState();
    const [availibe, setavailibe] = useState();

    const [tempid, settempid] = useState();
    const [tempname, tempsetname] = useState();
    const [tempbusno, tempsetbusno] = useState();
    const [temprevenue, tempsetrevenu] = useState();
    const [tempshift, tempsetshift] = useState();
    const [tempavailibe, tempsetavailibe] = useState();
    
    const [singleData, setSingleData] = useState();
    const [updateID, setupdateID] = useState();

    const [APIData, setAPIData] = useState([]);

    const [DispData, setDispData] = useState({
        showall: 'none',
        id: 'none',
        name: 'none',
        busno: 'none',
        revenue: 'none',
        shift: 'none',
        avalibility: 'none',
        text: 'Show'
    });

    const [DispForm, setDispForm] = useState({
        add: 'none',
        update: 'none',
        delete: 'none'
    })

    const [upId, setupId] = useState(0);

    //-------------------------------------------
    let sum = APIData.reduce((prev, curr) => {
        return (
            prev + +curr.Revenue
        )
    }, 0)
    //--------------------------------------------

    const Show = (item, data) => {
        setDispData((prevState) => {
            return {
                ...prevState,
                [item]: data === "none"
                    ? DispData[item] = "flex"
                    : DispData[item] = "none"
            }
        })
    }


    const Show2 = (item, data) => {
        setDispForm((prevState) => {
            return {
                ...prevState,
                [item]: data === "none"
                    ? DispForm[item] = "flex"
                    : DispForm[item] = "none"
            }
        })
    }
    const ShowAll = () => {
        if (DispData.showall === "none") {
            setDispData({
                showall: 'flex',
                id: 'flex',
                name: 'flex',
                busno: 'flex',
                revenue: 'flex',
                shift: 'flex',
                avalibility: 'flex',
                text: 'Hide'
            })
        }
        else {
            setDispData({
                showall: 'none',
                id: 'none',
                name: 'none',
                busno: 'none',
                revenue: 'none',
                shift: 'none',
                avalibility: 'none',
                text: 'Show'
            })
        }
    }

    const updateData = () => {
        if (upId === 0) {
            let id = prompt("Enter the ID");
            setupId(1);
            let data = APIData.filter((data) => {
                if (id === data.Id) {
                    settempid(id);
                    return id === data.Id;
                }
            })
            let [{ Id, Name, BusNo, Revenue, Shift, Availible }] = data;
            setupdateID(Id);
            tempsetname(Name);
            tempsetbusno(BusNo);
            tempsetrevenu(Revenue);
            tempsetshift(Shift);
            tempsetavailibe(Availible);
            setSingleData(data);

        }
        else {
            setupId(0);
        }
    }


    useEffect(() => {
        axios.get(`https://sheet.best/api/sheets/f1226171-9e74-45c3-988c-881556e5c1a0`)
            .then((OPdata) => {
                setAPIData(OPdata.data);
            })
    }, [])




    const AddData = (e) => {
        e.preventDefault();
        const data = {
            Id: id,
            Name: name,
            BusNo: busno,
            Revenue: revenue,
            Shift: shift,
            Availible: availibe
        }
        axios.post(`https://sheet.best/api/sheets/f1226171-9e74-45c3-988c-881556e5c1a0`, data).then((response) => {
            console.log(response);
            setid('');
            setname('');
            setbusno('');
            setrevenu('');
            setshift('');
            setavailibe('');
        })
    }


    const UpdatedData = async (e) => {
        e.preventDefault();
        setAPIData(current => current.map(obj => {
            if (tempid === obj.Id) {
                return { ...obj, Name: tempname, BusNo: tempbusno, Revenue: temprevenue, Shift: tempshift, Availible: tempavailibe }
            }
            return obj;
        }))
        tempsetname("");
        tempsetbusno("");
        tempsetrevenu("");
        tempsetshift("");
        tempsetavailibe("");
        setDispForm({
            update:"none"
        })
        setupId(0);
    }


    const deletedData =(e)=>{
        e.preventDefault()
        setAPIData(current => current.filter(obj => {
            return tempid !== obj.Id;
        }))
        console.log(APIData);
    }

    const getUpdateData = async () => {
        try {
            const res = await fetch(
                `https://sheet.best/api/sheets/f1226171-9e74-45c3-988c-881556e5c1a0/Id/${updateID}`
            );
            const data = await res.json();
            console.log(data);
        } catch (err) { console.log(err) }
    }
    useEffect(() => {
        getUpdateData()
    }, [])

    const deleteData = () => {
        if (upId === 0) {
            let id = prompt("Enter the ID");
            setupId(1);
            let data = APIData.filter((data) => {
                if (id === data.Id) {
                    return id === data.Id;
                }
            })
            let [{ Id }] = data;
            setupdateID(Id);
        }
        else {
            setupId(1);
        }
        
    }

    const ConfirmDelete = async (updateID) => {
        try {
            const res = await fetch(`https://sheet.best/api/sheets/f1226171-9e74-45c3-988c-881556e5c1a0/Id/${updateID}`,
                {
                    method: "DELETE"
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    const ConfirmNoDelete = () => {
        setDispForm({
            delete: 'none'
        })
        setupId(0);
    }


    const pswd = "123";
    let PSWD = "123";
    if (PSWD === pswd) {

        return (
            <React.Fragment>

                <h1>Admin </h1>
                <div className="Datas">
                    <div className="DispCard">
                        <div className="CardData">
                            <b>Total Employee</b>
                            <p>{APIData.length}</p>
                        </div>
                        <div className="CardData">
                            <b>Total Buses</b>
                            <p>{APIData.length}</p>
                        </div>
                        <div className="CardData">
                            <b>Total Revenue</b>
                            <p>{sum}</p>
                        </div>
                        <div className="CardData">
                            <b>Total Shits</b>
                            <p>{APIData.length}</p>
                        </div>
                    </div>
                    <div className="Disp">
                        <div className="DispId Comm" style={{ display: `${DispData.id}` }}>
                            <h1>Id</h1>
                            {
                                APIData.map((data) => {
                                    return (
                                        <p>{data.Id}</p>
                                    )
                                })
                            }
                        </div>
                        <div className="DispName Comm" style={{ display: `${DispData.name}` }}>
                            <h1>Name</h1>
                            {
                                APIData.map((data) => {
                                    return (
                                        <p>{data.Name}</p>
                                    )
                                })
                            }
                        </div>
                        <div className="DispBusNo Comm" style={{ display: `${DispData.busno}` }}>
                            <h1>BusNo</h1>
                            {
                                APIData.map((data) => {
                                    return (
                                        <p>{data.BusNo}</p>
                                    )
                                })
                            }
                        </div>
                        <div className="DispRevenue Comm" style={{ display: `${DispData.revenue}` }}>
                            <h1>Revenue</h1>
                            {
                                APIData.map((data) => {
                                    return (
                                        <p>{data.Revenue}</p>
                                    )
                                })
                            }
                        </div>
                        <div className="DispShift Comm" style={{ display: `${DispData.shift}` }}>
                            <h1>Shift</h1>
                            {
                                APIData.map((data) => {
                                    return (
                                        <p>{data.Shift}</p>
                                    )
                                })
                            }

                        </div>
                        <div className="DispAvail Comm" style={{ display: `${DispData.avalibility}` }}>
                            <h1>Avalibile</h1>
                            {
                                APIData.map((data) => {
                                    return (
                                        <p>{data.Availible}</p>
                                    )
                                })
                            }
                        </div>
                        <div className="DispBtn">
                            <button onClick={() => { ShowAll("showall", DispData.showall) }}>{DispData.text} All</button>
                            <button onClick={() => { Show("id", DispData.id) }}>Id</button>
                            <button onClick={() => { Show("name", DispData.name) }}>Name</button>
                            <button onClick={() => { Show("busno", DispData.busno) }}>BusNo</button>
                            <button onClick={() => { Show("revenue", DispData.revenue) }}>Revenue</button>
                            <button onClick={() => { Show("shift", DispData.shift) }}>Shift</button>
                            <button onClick={() => { Show("avalibility", DispData.avalibility) }}>Avalibilty</button>
                        </div>
                    </div>
                    <div className="ShowData">
                        <h1>CRUD Operations</h1>
                        <div className="CRUDbtn">
                            <button onClick={() => { Show2("add", DispForm.add) }}>Add Data</button>
                            <button onClick={() => { Show2("update", DispForm.update); updateData() }}>Update Data</button>
                            <button onClick={() => { Show2("delete", DispForm.delete); deleteData() }}>Delete Data</button>
                        </div>
                        <div className="Form" style={{ display: `${DispForm.add}` }}>
                            <h1>Add Data</h1>
                            <form onSubmit={AddData}>
                                <div className="FormData">
                                    <label>Id</label><input type="number"
                                        value={id}
                                        onChange={(e) => { setid(e.target.value) }}
                                    />
                                </div>

                                <div className="FormData">
                                    <label>Name</label><input type="text"
                                        value={name}
                                        onChange={(e) => { setname(e.target.value) }}
                                    />
                                </div>

                                <div className="FormData">
                                    <label>BusNo</label><input type="text"
                                        value={busno}
                                        onChange={(e) => { setbusno(e.target.value) }}
                                    />
                                </div>

                                <div className="FormData">
                                    <label>Revenue</label><input type="number"
                                        value={revenue}
                                        onChange={(e) => { setrevenu(e.target.value) }}
                                    />
                                </div>

                                <div className="FormData">
                                    <label>Shift</label><input type="text"
                                        value={shift}
                                        onChange={(e) => { setshift(e.target.value) }}
                                    />
                                </div>

                                <div className="FormData">
                                    <label>Available</label><input type="text"
                                        value={availibe}
                                        onChange={(e) => { setavailibe(e.target.value) }}
                                    />
                                </div>
                                <button>Submit</button>
                            </form>
                        </div>

                        {/*-------------------------------------------------------------------------------------------------- */}
                        <div className="Form" style={{ display: `${DispForm.update}` }}>
                            <h1>Update Data</h1>
                            <form onSubmit={UpdatedData}>
                                <div className="FormData">
                                    <label>Name</label><input type="text"
                                        onChange={(e) => { tempsetname(e.target.value); }}
                                        value={tempname}
                                    />
                                </div>

                                <div className="FormData">
                                    <label>BusNo</label><input type="text"
                                        onChange={(e) => { tempsetbusno(e.target.value) }}
                                        value={tempbusno}
                                    />
                                </div>

                                <div className="FormData">
                                    <label>Revenue</label><input type="number"
                                        onChange={(e) => { tempsetrevenu(e.target.value) }}
                                        value={temprevenue}
                                    />
                                </div>

                                <div className="FormData">
                                    <label>Shift</label><input type="text"
                                        onChange={(e) => { tempsetshift(e.target.value) }}
                                        value={tempshift}
                                    />
                                </div>

                                <div className="FormData">
                                    <label>Available</label><input type="text"
                                        onChange={(e) => { tempsetavailibe(e.target.value) }}
                                        value={tempavailibe}
                                    />
                                </div>
                                <button>Submit</button>
                            </form>
                        </div>

                        <div className="Form" style={{ display: `${DispForm.delete}` }}>
                            <h1>Delete Data</h1>
                            <form onSubmit={deletedData}>
                                <button onClick={() => { ConfirmDelete(updateID) }}>Confirm</button><button onClick={ConfirmNoDelete}>No</button>
                            </form>
                        </div>
                        <div className="Option"></div>
                    </div>
                </div>
            </React.Fragment >
        )

    }
    else {
        return (
            <React.Fragment>
                <h1 style={{ fontSiize: '3rem' }}>Cannot Excess This Page</h1>
            </React.Fragment>
        )
    }
}


export default DisplayData;