import React, { useState, useEffect } from "react";
import { StatsCard } from "./StatsCard";
import "../style/Card.scss";

export const StatsResa = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Effectuer la requête à l'API pour récupérer les réservations
    fetch("https://api.lunastra.ghmir.butmmi.o2switch.site/index.php")
      .then(response => response.json())
      .then(data => {
        console.log("Données récupérées de l'API :", data);
        // Assurer que data contient directement un tableau de réservations
        setReservations(data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);  // L'effet se lance une seule fois au montage du composant

  // Calculer le nombre total de réservations
  const nombreDeReservations = reservations.length;

  const totalEntrées = reservations.reduce((total, reservation) => {
    // On convertit "amount" en nombre avec parseFloat pour éviter les problèmes de type
    const amount = parseFloat(reservation.amount);
    if (!isNaN(amount)) {
      return total + amount;  // Si amount est un nombre valide, on l'ajoute au total
    }
    return total;  // Sinon, on garde le total inchangé
  }, 0);
  
  
  return (
    <section className="statCards">
      <StatsCard
        title="Réservations cette semaine"
        value={nombreDeReservations}  // Afficher le nombre total de réservations
      />
      <StatsCard
        title="Total de réservations"
        value={nombreDeReservations}  // Afficher encore le nombre total de réservations
      />
      <StatsCard
        title="Billets vendus"
        value={totalEntrées}  // Afficher le total des entrées (sum des "amount")
      />
    </section>
  );
};

export default StatsResa;
