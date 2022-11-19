import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { TiDelete } from "react-icons/ti";

function App() {
    const [member, setMember] = useState("");
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        Axios.get("https://argo-naute.herokuapp.com/api/get").then(
            (response) => {
                console.log(response.data);
                setMemberList(response.data);
            }
        );
    }, []);

    const submitMember = () => {
        Axios.post("https://argo-naute.herokuapp.com/api/insert", {
            members: member,
        });

        setMemberList([...memberList, { member: member }]);
    };

    const deleteMember = (memb) => {
        Axios.delete(`https://argo-naute.herokuapp.com/api/delete/${memb}`);
        window.location.reload(false);
    };

    return (
        <div className="App">
            <header>
                <h1>
                    <img
                        src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
                        alt="Wild Code School logo"
                    />
                    Les Argonautes
                </h1>
            </header>

            <main>
                <h2>Ajouter un(e) Argonaute</h2>
                <form className="new-member-form">
                    <label htmlFor="name">Nom de l'Argonaute</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Charalampos"
                        onChange={(e) => {
                            setMember(e.target.value);
                        }}
                    />
                    <button disabled={member < 1} onClick={submitMember}>
                        Ajouter
                    </button>
                </form>

                <h2>Membres de l'équipage</h2>
                <section className="member-list">
                    <table>
                        <tbody>
                            <tr>
                                {memberList.map((val, i) => {
                                    return (
                                        <>
                                            <th>Eleftheria</th>
                                            <th>Gennadios</th>
                                            <th>Lysimachos</th>
                                            <th key={i}>
                                                {val.members}

                                                <TiDelete
                                                    className="deleteButton"
                                                    onClick={() => {
                                                        deleteMember(
                                                            val.members
                                                        );
                                                    }}
                                                />
                                            </th>
                                        </>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>

            <footer>
                <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
            </footer>
        </div>
    );
}

export default App;
