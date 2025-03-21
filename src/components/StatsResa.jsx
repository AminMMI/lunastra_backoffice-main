import React, { useState, useEffect } from "react";
import { StatsCard } from "./StatsCard";
import "../style/Card.scss";

export const StatsResa = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("https://api.lunastra.ghmir.butmmi.o2switch.site/index.php")
      .then(response => response.json())
      .then(data => {
        console.log("Données récupérées de l'API :", data);
        setReservations(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []); 

  const nombreDeReservations = reservations.length;

  const totalEntrées = reservations.reduce((total, reservation) => {
    const amount = parseFloat(reservation.amount);
    if (!isNaN(amount)) {
      return total + amount;  
    }
    return total; 
  }, 0);
  
  
  return (
    <section className="statCards">
      <StatsCard
        title="Réservations cette semaine"
        value={nombreDeReservations} 
      />
      <StatsCard
        title="Total de réservations"
        value={nombreDeReservations} 
      />
      <StatsCard
        title="Billets vendus"
        value={totalEntrées}  
      />
    </section>
  );
};

export default StatsResa;
