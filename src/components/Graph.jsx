import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../style/Graph.scss";
import data from "./data.json"; 

export const Graph = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.labels, // 📌 Utilisation directe du JSON importé
                datasets: [{
                    label: "Nombre d'entrées",
                    data: data.values,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        return () => chartInstance.current.destroy();
    }, []); // 🔄 Le graphique est généré une seule fois au montage

    return (
        <div class="resa_graph">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default Graph 