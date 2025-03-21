import React, { useState, useEffect, useRef } from "react";
import "../style/Tableau.scss";

export const Exposition = () => {
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(null); 
  const [editedValuePrenom, setEditedValuePrenom] = useState("");
  const [editedValueNom, setEditedValueNom] = useState("");
  const [editedValueEmail, setEditedValueEmail] = useState("");
  const [editedValueDate, setEditedValueDate] = useState("");
  const [editedValueHoraire, setEditedValueHoraire] = useState("");
  const [editedValueAmount, setEditedValueAmount] = useState("");
  const RefRefreshIcon = useRef(null);
  const buttonRefresh = useRef(null);

  const fetchReservations = async () => {
    try {
      const response = await fetch('https://api.lunastra.ghmir.butmmi.o2switch.site/index.php');
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations : ", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    const idToDelete = Number(e.target.value);
    try {
      const response = await fetch('https://api.lunastra.ghmir.butmmi.o2switch.site/index.php', {
        method: 'POST',
        body: JSON.stringify({ action: 'delete', id: idToDelete }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.success) {
        setReservations(reservations.filter((r) => r.id !== idToDelete));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation : ", error);
    }
  };

  const handleRefresh = () => {
    if (!RefRefreshIcon.current || !buttonRefresh.current) return;
    if (buttonRefresh.current.disabled) return;
    buttonRefresh.current.disabled = true;
  
    RefRefreshIcon.current.style.transition = "transform 0.8s ease-in-out";
    RefRefreshIcon.current.style.transform = "rotate(360deg)";
  
    setTimeout(() => {
      if (RefRefreshIcon.current) { 
        RefRefreshIcon.current.style.transition = "none";
        RefRefreshIcon.current.style.transform = "rotate(0deg)";
      }
      buttonRefresh.current.disabled = false;
    }, 1000);
  
    fetchReservations();
  };
  

  const handleEdit = (id, reservation) => {
    setEditing(id);
    setEditedValuePrenom(reservation.prenom);
    setEditedValueNom(reservation.nom);
    setEditedValueEmail(reservation.email);
    setEditedValueDate(reservation.date);
    setEditedValueHoraire(reservation.horaire);
    setEditedValueAmount(reservation.amount);
  };

  const handleSave = async (id) => {
    const updatedReservation = {
      prenom: editedValuePrenom,
      nom: editedValueNom,
      email: editedValueEmail,
      date: editedValueDate,
      horaire: editedValueHoraire,
      amount: editedValueAmount,
    };

    try {
      const response = await fetch('https://api.lunastra.ghmir.butmmi.o2switch.site/index.php', {
        method: 'POST',
        body: JSON.stringify({
          action: 'update', 
          id: id,       
          updatedValues: updatedReservation, 
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log("Réponse du serveur : ", result);

      if (result.success) {
        setReservations(reservations.map((r) =>
          r.id === id ? { ...r, ...updatedReservation } : r
        ));
        setEditing(null); 
        setEditedValuePrenom(""); 
        setEditedValueNom("");
        setEditedValueEmail("");
        setEditedValueDate("");
        setEditedValueHoraire("");
        setEditedValueAmount("");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation : ", error);
    }
  };



  return (
    <>
      <div className="refresh-table">
        <button onClick={handleRefresh} ref={buttonRefresh}>
        <span ref={RefRefreshIcon}>🔄</span>
        </button>
      </div>
      {reservations.length === 0 ? (
        <div className="resaTable__noResa">
          <p>Aucune réservation pour le moment</p>
        </div>
      ) : (
        <table className="resaTable">
          <caption>Réservations de l'exposition</caption>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Date de réservation</th>
              <th>Horaire</th>
              <th>Billets</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => {
              const optionsDate = {
                year: "numeric",
                month: "numeric",
                day: "numeric"
              };

              const dateReservation = new Date(r.date).toLocaleDateString("fr-FR", optionsDate);

              return (
                <tr key={r.id}>
                  <td>
                    {editing === r.id ? (
                      <input 
                        type="text" 
                        value={editedValuePrenom} 
                        onChange={(e) => setEditedValuePrenom(e.target.value)} 
                      />
                    ) : (
                      r.prenom
                    )}
                  </td>
                  <td>
                    {editing === r.id ? (
                      <input 
                        type="text" 
                        value={editedValueNom} 
                        onChange={(e) => setEditedValueNom(e.target.value)} 
                      />
                    ) : (
                      r.nom
                    )}
                  </td>
                  <td>
                    {editing === r.id ? (
                      <input 
                        type="email" 
                        value={editedValueEmail} 
                        onChange={(e) => setEditedValueEmail(e.target.value)} 
                      />
                    ) : (
                      r.email
                    )}
                  </td>
                  <td>
                    {editing === r.id ? (
                      <input 
                        type="date" 
                        value={editedValueDate} 
                        onChange={(e) => setEditedValueDate(e.target.value)} 
                      />
                    ) : (
                      dateReservation
                    )}
                  </td>
                  <td>
                    {editing === r.id ? (
                      <input 
                        type="time" 
                        value={editedValueHoraire} 
                        onChange={(e) => setEditedValueHoraire(e.target.value)} 
                      />
                    ) : (
                      r.horaire
                    )}
                  </td>
                  <td>
                    {editing === r.id ? (
                      <input 
                        type="number" 
                        value={editedValueAmount} 
                        onChange={(e) => setEditedValueAmount(e.target.value)} 
                      />
                    ) : (
                      r.amount
                    )}
                  </td>
                  <td>
                    {editing === r.id ? (
                      <button class="button_modifier" onClick={() => handleSave(r.id)}>Sauvegarder</button>
                    ) : (
                      <button class="button_modifier" onClick={() => handleEdit(r.id, r)}>Modifier</button>
                    )}
                    <button class="button_supprimer" onClick={handleDelete} value={r.id}>
                      ❌
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Exposition;
