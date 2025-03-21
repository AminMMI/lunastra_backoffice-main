import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "../style/Graph.scss";

export const Graph = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    const fetchGraphData = async () => {
        try {
            const response = await fetch("https://api.lunastra.ghmir.butmmi.o2switch.site/index.php");
            const data = await response.json();
            
            const newLabels = data.map(resa => resa.date); 
            const newValues = data.map(resa => resa.amount); 
            
            setLabels(newLabels);
            setValues(newValues);
        } catch (error) {
            console.error("Erreur lors de la récupération des données du graphique :", error);
        }
    };

    useEffect(() => {
        fetchGraphData();
    }, []);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (labels.length > 0 && values.length > 0) {
            const ctx = chartRef.current.getContext("2d");
            chartInstance.current = new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Nombre d'entrées",
                        data: values,
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
        }
    }, [labels, values]); 

    return (
        <div className="resa_graph">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default Graph;
